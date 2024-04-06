const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.CreateOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({
      success: true,
      savedOrder,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.UpdatedOrder = async (req, res) => {
  try {
    const UpdatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ success: true, UpdatedOrder });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not update Order",
    });
  }
};

exports.DeleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not delete Order",
    });
  }
};

exports.GetOrder = async (req, res) => {
  try {
    const Order = await Order.find({ userId: req.parms.userId });
    res.status(200).json({
      Order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "you are not allowed to access this",
    });
  }
};

exports.AllOrders = async (req, res) => {
  try {
    let allorders;
    allorders = await Order.find();
    res.status(200).json({
      allorders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "you are not allowed to access this",
    });
  }
};

exports.MonthIncome = async (req, res) => {
  const date = new Date();
  // if now september this is august
  const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
  // this is july
  const previousmonth = new Date(
    new Date(date.setMonth(lastmonth.getMonth() - 1))
  );
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousmonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({
      income,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

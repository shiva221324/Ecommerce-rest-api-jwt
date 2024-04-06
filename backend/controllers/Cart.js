const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.CreateCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newProduct.save();
    res.status(200).json({
      success: true,
      savedCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.UpdatedCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ success: true, updatedCart });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not update cart",
    });
  }
};

exports.DeleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Cart deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not delete Cart",
    });
  }
};

exports.GetCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.parms.userId });
    res.status(200).json({
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "you are not allowed to access this",
    });
  }
};

exports.AllCarts = async (req, res) => {
  try {
    let allcart;
    allcart = await Cart.find();
    res.status(200).json({
      allcart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "you are not allowed to access this",
    });
  }
};

const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.CreateProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({
      success: true,
      savedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.UpdatedProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ success: true, updatedProduct });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not update product",
    });
  }
};

exports.DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not delete Product",
    });
  }
};

exports.GetProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "you are not allowed to access this",
    });
  }
};

exports.AllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let allproducts;
    if (qNew) {
      allproducts = await Product.find().sort({ createdAt: -1 });
    } else if (qCategory) {
      allproducts = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      allproducts = await Product.find();
    }
    res.status(200).json({
      allproducts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "you are not allowed to access this",
    });
  }
};

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Update = async (req, res) => {
  if (req.body.password) {
    let hassedpassword;
    hassedpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hassedpassword;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Could not update user",
    });
  }
};

exports.Delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "user deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not delete user",
    });
  }
};

exports.GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    const { password, ...others } = user._doc;
    res.status(200).json({
      others,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "you are not allowed to access this",
    });
  }
};

exports.AllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "you are not allowed to access this",
    });
  }
};

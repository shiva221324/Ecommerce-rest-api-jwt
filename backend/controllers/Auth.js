const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email: email });
  //if user already exists
  if (existing) {
    return res.status(400).json({
      success: true,
      message: "User already exists",
    });
  }
  let hassedpassword;
  hassedpassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: hassedpassword,
  });

  try {
    const savedUser = await newUser.save();
    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "user Cannot be registered ,please try again later",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered",
      });
    }
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const playload = {
      id: user._id,
      isAdmin: user.isAdmin,
    };
    console.log(playload);
    const accesstoken = jwt.sign(playload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(accesstoken);
    const { upassword, ...others } = user._doc;

    return res
      .cookie("token", accesstoken)
      .status(200)
      .json({
        ...others,
        accesstoken,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Cannot login now, please try again later",
    });
  }
};

const User = require("../models/User");
// const nodemailer = require("nodemailer");

const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
    });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ message: "Email already exists!" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const loginController = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (!error) {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Email doesn't exist!" });
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid)
        return res.status(401).send({ message: "Invalid password" });
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "2d",
      });
      res.header("token", token).send({ token: token });
    } else {
      res.status(400).send({
        message: error.details[0].message,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = {
  registerController,
  loginController,
}

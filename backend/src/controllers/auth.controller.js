const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUSerAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUSerAlreadyExist) {
    if (isUSerAlreadyExist.username == username) {
      return res
        .status(400)
        .json({ message: "User already exist with this username." });
    }

    if (isUSerAlreadyExist.email == email) {
      return res
        .status(400)
        .json({ message: "User already exist with this email." });
    }
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message : "User registered successfully",
    user : {
        id : user._id,
        username : user.username,
        email : user.email
    }
  })
}

module.exports = { registerUserController };

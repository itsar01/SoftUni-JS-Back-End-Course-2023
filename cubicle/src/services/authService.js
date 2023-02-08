const User = require("../models/User.js");
const config = require("../config/config.js");
const jwt = require("../lib/jsonwebtoken.js");
const AppError = require("../utils/appError.js");

exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
  const user = await this.getUserByUsername(username);

  if (!user) {
    throw new AppError("Invalid username!", { user });
    // {
    //   message: "Invalid username",
    //   data: user,
    // };
    // new Error("Invalid username!");
  }

  const isValid = await user.validatePassword(password);
  //   (!(user && !user.validatePassword(password)));
  if (!isValid) {
    throw new AppError("Invalid password!");

    // {
    //   message: "Invalid password!",
    // };
  }

  const payload = { _id: user._id, username: user.username };

  const token = jwt.sign(payload, config.SECRET, { expiresIn: "2h" });

  return token;
};

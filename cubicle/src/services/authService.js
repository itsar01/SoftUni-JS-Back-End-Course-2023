const User = require("../models/User.js");
const config = require("../config/config.js");
const jwt = require("../lib/jsonwebtoken.js");

exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
  const user = await this.getUserByUsername(username);

  const isValid = await user.validatePassword(password);
  //   (!(user && !user.validatePassword(password)));
  if (!user || !isValid) {
    throw "Invalid username or password!";
  }

  const payload = { username: user.username };

  const token = jwt.sign(payload, config.SECRET, { expiresIn: "2h" });

  return token;
};

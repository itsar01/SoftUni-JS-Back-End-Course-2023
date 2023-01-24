const Cube = require("../models/Cube.js");

exports.getCreateCube = (req, res) => {
  res.render("create");
};
exports.postCreateCube = (req, res) => {
  // save cube
  let cube = new Cube(req.body);

  Cube.save(cube);
  // redirect
  res.redirect("/");
};

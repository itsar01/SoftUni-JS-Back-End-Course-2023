// const Cube = require("../models/Cube_old.js");
const Cube = require("../models/Cube.js");
const db = require("../db.json");

exports.getCreateCube = (req, res) => {
  res.render("create");
};
exports.postCreateCube = async (req, res) => {
  // save cube
  const { name, description, imageUrl, difficultyLevel } = req.body;

  let cube = new Cube({ name, description, imageUrl, difficultyLevel });

  await cube.save();
  // redirect
  res.redirect("/");
};

exports.getDetails = async (req, res) => {
  const cube = await Cube.findById(req.params.cubeId).lean();

  if (!cube) {
    return res.redirect("/404");
  }

  res.render("details", { cube });
};

// const Cube = require("../models/Cube_old.js");
const Cube = require("../models/Cube.js");
const Accessory = require("../models/Accessory.js");

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
  const cube = await Cube.findById(req.params.cubeId)
    .populate("accessories")
    .lean();

  console.log(cube);

  if (!cube) {
    return res.redirect("/404");
  }

  res.render("cube/details", { cube });
};

exports.getAttachAccessory = async (req, res) => {
  const cube = await Cube.findById(req.params.cubeId).lean();
  const accessories = await Accessory.find().lean();
  res.render("cube/attach", { cube, accessories });
};

exports.postAttachAccessory = async (req, res) => {
  const cube = await Cube.findById(req.params.cubeId);
  const accessoryId = req.body.accessory;
  cube.accessories.push(accessoryId);

  cube.save();
  res.redirect(`/cubes/${cube._id}/details`);
};

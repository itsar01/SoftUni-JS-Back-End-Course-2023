// const db = require("../db.json");

const Cube = require("../models/Cube.js");

exports.getHomePage = async (req, res) => {
  const { search, from: difficultyFrom, to: difficultyTo } = req.query;

  let cubes = await Cube.find().lean();

  // TODO: Use db filtration instead of in memory filtering
  if (search) {
    cubes = cubes.filter((cube) =>
      cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
  if (difficultyFrom) {
    cubes = cubes.filter((cube) => cube.difficultyLevel >= difficultyFrom);
  }
  if (difficultyTo) {
    cubes = cubes.filter((cube) => cube.difficultyLevel <= difficultyTo);
  }
  res.render("index", { cubes, search, difficultyFrom, difficultyTo });
};

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getErrorPage = (req, res) => {
  res.render("404");
};

// const express = require("express");
// const Router = express.Router;
// const router = Router();

const router = require("express").Router();
const cubeController = require("./controllers/cubeController.js");
const homeController = require("./controllers/homeController.js");
const accessoryController = require("./controllers/accessoryController.js");
const authController = require("./controllers/authController.js");
const { isAuthenticated } = require("./middlewares/authMiddleware.js");

router.get("/", homeController.getHomePage);
router.get("/about", homeController.getAboutPage);
router.get("/404", homeController.getErrorPage);
// router.get("/create", (req, res) => {
//   res.render("create");
// });

router.use("/", authController);

router.get("/cubes/create", isAuthenticated, cubeController.getCreateCube);
router.post("/cubes/create", isAuthenticated, cubeController.postCreateCube);
router.get("/cubes/:cubeId/details", cubeController.getDetails);
router.get("/cubes/:cubeId/edit", cubeController.getEditCube);
router.post("/cubes/:cubeId/edit", cubeController.postEditCube);
router.get("/cubes/:cubeId/delete", cubeController.getDeleteCube);
router.post("/cubes/:cubeId/delete", cubeController.postDeleteCube);
router.get("/cubes/:cubeId/attach", cubeController.getAttachAccessory);
router.post("/cubes/:cubeId/attach", cubeController.postAttachAccessory);

router.use("/accessories", accessoryController);

module.exports = router;

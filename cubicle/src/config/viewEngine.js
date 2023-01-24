//changed file extension to .hbs
const handlebars = require("express-handlebars");

function setupViewEngine(app) {
  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
    })
  );
  app.set("view engine", "hbs");
  //default folder changed to ./src/views
  app.set("views", "./src/views");
}

module.exports = setupViewEngine;

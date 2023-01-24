const express = require("express");

const config = require("./config/config");
const setupViewEngine = require("./config/viewEngine.js");

const app = express();
setupViewEngine(app);

// require('./config/viewEngine.js')(app);

app.use(express.static("src/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(config.PORT, () =>
  console.log(`Server is running on port ${config.PORT}`)
);

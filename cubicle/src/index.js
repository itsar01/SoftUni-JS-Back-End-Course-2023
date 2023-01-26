const express = require("express");

const routes = require("./routes.js");
const config = require("./config/config");
const setupViewEngine = require("./config/viewEngine.js");
const initDatabase = require("./config/databaseInit.js");

const app = express();
setupViewEngine(app);

// require('./config/viewEngine.js')(app);

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

initDatabase()
  .then(() =>
    app.listen(config.PORT, () =>
      console.log(`Server is running on port ${config.PORT}`)
    )
  )
  .catch((err) => console.log(err.message));

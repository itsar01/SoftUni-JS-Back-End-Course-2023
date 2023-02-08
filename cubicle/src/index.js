const express = require("express");

const routes = require("./routes.js");
const config = require("./config/config");
const errorHanlder = require("./middlewares/errorHandlerMiddleware.js");
const setupViewEngine = require("./config/viewEngine.js");
const initDatabase = require("./config/databaseInit.js");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/authMiddleware.js");
//auth must be placed before the routes and after the cookie parses.

const app = express();
setupViewEngine(app);

// require('./config/viewEngine.js')(app);

app.use(express.static("src/public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(auth.authentication);
app.use(routes);
app.use(errorHanlder);

initDatabase()
  .then(() =>
    app.listen(config.PORT, () =>
      console.log(`Server is running on port ${config.PORT}`)
    )
  )
  .catch((err) => console.log(err.message));

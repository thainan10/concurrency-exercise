const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const routes = require("./routes");
const errorHandler = require("./middleware/error-handler");
const app = express();

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use(routes);
app.use(errorHandler);

module.exports = app;

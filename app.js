const express = require('express');
const bodyParser = require('body-parser');
const { intentMiddleware } = require('./middleware');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(intentMiddleware);
app.use(routes);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const {
  intentMiddleware,
  requiredAssitantParamsMiddleware,
} = require('./middleware');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(intentMiddleware);
app.use(requiredAssitantParamsMiddleware);
app.use(routes);

module.exports = app;

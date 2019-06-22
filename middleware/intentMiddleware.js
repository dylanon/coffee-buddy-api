const { INTENT_ROUTES } = require('../constants');
const { createTextResponse } = require('../utils');

module.exports = async (req, res, next) => {
  const {
    queryResult: { intent },
  } = req.body;
  const route = INTENT_ROUTES[intent.name];
  if (!route) {
    return res.send(createTextResponse(`Sorry, I don't know how to do that.`));
  }
  req.url = route;
  next();
};

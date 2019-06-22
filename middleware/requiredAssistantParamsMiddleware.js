const { createTextResponse } = require('../utils');

module.exports = (req, res, next) => {
  const {
    queryResult: { allRequiredParamsPresent },
  } = req.body || { queryResult: {} };
  if (allRequiredParamsPresent === true) {
    return next();
  }
  const response = createTextResponse(
    `Sorry, I don't have enough information.`
  );
  res.send(response);
};

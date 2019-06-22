const {
  GRAMS_WATER_PER_CUP_COFFEE,
  GRAMS_WATER_PER_GRAM_COFFEE,
} = require('../constants');
const { createTextResponse } = require('../utils');

module.exports = (req, res) => {
  const {
    queryResult: { allRequiredParamsPresent, parameters },
  } = req.body;
  if (!allRequiredParamsPresent) {
    const response = createTextResponse(
      `Sorry, I don't have enough information. ${howTo}`
    );
    res.send(response);
  }
  const { numberOfCups } = parameters;
  let response;
  if (numberOfCups === 0) {
    response = createTextResponse(`0 cups? You don't need my help for that!`);
  } else if (numberOfCups < 0) {
    response = createTextResponse(
      `I'm not sure what you mean. Ask me to how to make ${numberOfCups *
        -1} cups, though.`
    );
  } else {
    const totalWater = GRAMS_WATER_PER_CUP_COFFEE * numberOfCups;
    const totalCoffee = (totalWater / GRAMS_WATER_PER_GRAM_COFFEE).toFixed(1);
    response = createTextResponse(
      `You'll need ${totalWater}ml of water and ${totalCoffee}g of coffee to make ${numberOfCups} cups. A standard cup of coffee is 180ml.`
    );
  }
  res.send(response);
};

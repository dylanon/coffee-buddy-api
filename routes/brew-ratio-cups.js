const {
  GRAMS_WATER_PER_CUP_COFFEE,
  GRAMS_WATER_PER_GRAM_COFFEE,
} = require('../constants');
const { createTextResponse } = require('../utils');

module.exports = (req, res) => {
  const {
    queryResult: { parameters },
  } = req.body || { queryResult };
  const { numberOfCups } = parameters || {};
  let response;
  if (numberOfCups === 0) {
    response = createTextResponse(`0 cups? You don't need my help for that!`);
  } else if (numberOfCups < 0) {
    response = createTextResponse(
      `I'm not sure what you mean. Ask me to how to make ${numberOfCups *
        -1} cups, though.`
    );
  } else if (!numberOfCups) {
    response = createTextResponse(`I'm not sure how to help with that.`);
  } else {
    const totalWater = GRAMS_WATER_PER_CUP_COFFEE * numberOfCups;
    const totalCoffee = (totalWater / GRAMS_WATER_PER_GRAM_COFFEE).toFixed(1);
    response = createTextResponse(
      `You'll need ${totalWater}ml of water and ${totalCoffee}g of coffee to make ${numberOfCups} cups. A standard cup of coffee is 180ml.`
    );
  }
  res.send(response);
};

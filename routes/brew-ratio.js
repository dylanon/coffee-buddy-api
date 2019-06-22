const { GRAMS_WATER_PER_GRAM_COFFEE, INGREDIENTS } = require('../constants');
const { createTextResponse } = require('../utils');

const validIngredients = Object.values(INGREDIENTS);

module.exports = async (req, res) => {
  const {
    queryResult: { allRequiredParamsPresent, parameters },
  } = req.body;
  const { knownIngredient, weight } = parameters;
  // Validate required parameters
  const howTo =
    'Try telling me how many grams of ground coffee or water you want to use.';
  if (!allRequiredParamsPresent) {
    const response = createTextResponse(
      `Sorry, I don't have enough information. ${howTo}`
    );
    res.send(response);
  }
  const cleanKnownIngredient = knownIngredient.toLowerCase();
  if (!validIngredients.includes(cleanKnownIngredient)) {
    const response = createTextResponse(
      `Sorry, I don't recognize that ingredient. ${howTo}`
    );
    res.send(response);
  }
  const { amount } = weight;
  if (amount < 0) {
    const response = createTextResponse(
      `I can't deal with all that negativity. 🙃`
    );
    res.send(response);
  }
  // Populate unknownIngredient if it was not passed
  let { unknownIngredient } = parameters;
  if (!unknownIngredient || !validIngredients.includes(unknownIngredient)) {
    unknownIngredient =
      cleanKnownIngredient === INGREDIENTS.COFFEE
        ? INGREDIENTS.WATER
        : INGREDIENTS.COFFEE;
  }
  // Calculate the amount of unknownIngredient needed
  let calculatedAmount = 0;
  if (cleanKnownIngredient === INGREDIENTS.COFFEE) {
    calculatedAmount = amount * GRAMS_WATER_PER_GRAM_COFFEE;
  } else if (cleanKnownIngredient === INGREDIENTS.WATER) {
    calculatedAmount = amount / GRAMS_WATER_PER_GRAM_COFFEE;
  }
  calculatedAmount = calculatedAmount.toFixed(1);
  const response = createTextResponse(
    `For ${amount} grams of ${cleanKnownIngredient}, you'll need ${calculatedAmount} grams of ${unknownIngredient}.`
  );
  res.send(response);
};

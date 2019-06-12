const { json } = require('micro');
const { GRAMS_WATER_PER_GRAM_COFFEE, INGREDIENTS } = require('../constants');
const { createTextResponse } = require('../utils');

const { INTENT_GET_BREW_RATIO } = process.env;
const validIngredients = Object.values(INGREDIENTS);

module.exports = async (req, res) => {
  const body = await json(req);
  const {
    queryResult: { allRequiredParamsPresent, intent, parameters },
  } = body;
  const { knownIngredient, weight } = parameters;
  // Validate intent
  if (intent.name !== INTENT_GET_BREW_RATIO) {
    const response = createTextResponse("Sorry, I don't know how to do that.");
    res.end(response);
  }
  // Validate required parameters
  const howTo =
    'Try telling me how many grams of ground coffee or water you want to use.';
  if (!allRequiredParamsPresent) {
    const response = createTextResponse(
      `Sorry, I don't have enough information. ${howTo}`
    );
    res.end(response);
  }
  const cleanKnownIngredient = knownIngredient.toLowerCase();
  if (!validIngredients.includes(cleanKnownIngredient)) {
    const response = createTextResponse(
      `Sorry, I don't recognize that ingredient. ${howTo}`
    );
    res.end(response);
  }
  const { amount } = weight;
  if (amount < 0) {
    const response = createTextResponse(
      `I can't deal with all that negativity. 🙃`
    );
    res.end(response);
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
  res.end(response);
};

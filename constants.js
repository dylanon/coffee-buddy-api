module.exports = {
  GRAMS_WATER_PER_GRAM_COFFEE: 16.6945,
  INGREDIENTS: {
    COFFEE: 'coffee',
    WATER: 'water',
  },
  INTENT_ROUTES: {
    [process.env.INTENT_GET_BREW_RATIO]: '/brew-ratio',
  },
};

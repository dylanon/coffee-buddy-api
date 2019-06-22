const { INTENT_GET_BREW_RATIO, INTENT_GET_BREW_RATIO_BY_CUPS } = process.env;

module.exports = {
  GRAMS_WATER_PER_GRAM_COFFEE: 16.6945,
  INGREDIENTS: {
    COFFEE: 'coffee',
    WATER: 'water',
  },
  INTENT_ROUTES: {
    [INTENT_GET_BREW_RATIO]: '/brew-ratio',
    [INTENT_GET_BREW_RATIO_BY_CUPS]: '/brew-ratio-cups',
  },
  GRAMS_WATER_PER_CUP_COFFEE: 180,
};

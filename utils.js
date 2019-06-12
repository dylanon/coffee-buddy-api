const createTextResponse = fulfillmentText => {
  const response = JSON.stringify({
    fulfillmentText,
  });
  return response;
};

module.exports = {
  createTextResponse,
};

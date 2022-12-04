const { getBestClientsInRange } = require("../../controllers/admin");

/**
 * Returns the clients that paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
 *
 *End date not included
 *
 * @returns best clients
 */
module.exports = async (req, res, next) => {
  const {
    query: { limit },
    dateRange,
  } = req;

  try {
    const clients = await getBestClientsInRange(dateRange, limit);

    return res.json(clients);
  } catch (error) {
    return next(error);
  }
};

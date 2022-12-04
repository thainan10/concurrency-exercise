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
    query: { start, end, limit },
  } = req;

  try {
    const clients = await getBestClientsInRange(start, end, limit);

    return res.json(clients);
  } catch (error) {
    return next(error);
  }
};

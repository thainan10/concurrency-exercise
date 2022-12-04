const { getBestProfessionInRange } = require("../../controllers/admin");

/**
 * Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
 *
 *End date not included
 *
 * @returns profession
 */
module.exports = async (req, res, next) => {
  const {
    query: { start, end },
  } = req;

  try {
    const profession = await getBestProfessionInRange(start, end);

    return res.json(profession);
  } catch (error) {
    return next(error);
  }
};

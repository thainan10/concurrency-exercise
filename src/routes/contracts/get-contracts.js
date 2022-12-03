const { getContracts } = require("../../controllers/contracts");

/**
 * Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.
 * @returns contracts
 */
module.exports = async (req, res, next) => {
  const {
    profile: { id: profileId },
  } = req;

  try {
    const contracts = await getContracts(profileId);

    return res.json(contracts);
  } catch (error) {
    return next(error);
  }
};

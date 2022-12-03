const { getContractById } = require("../../controllers/contracts");

/**
 * Returns contract by ID, if it belongs to the authenticated profile.
 *
 * @returns contract by ID
 */
module.exports = async (req, res, next) => {
  const {
    params: { id: contractId },
    profile: { id: profileId },
  } = req;

  try {
    const contract = await getContractById(profileId, contractId);

    return res.json(contract);
  } catch (error) {
    return next(error);
  }
};

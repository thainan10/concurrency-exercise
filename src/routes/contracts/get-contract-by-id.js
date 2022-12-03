const { getContractById } = require("../../controllers/contracts");

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

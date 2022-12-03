const { Op } = require("sequelize");
const { Contract } = require("../model");
const { ServerError } = require("../utils/errors");

async function getContractById(profileId, contractId) {
  const contract = await Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    },
  });

  if (!contract) {
    throw new ServerError("Contract not found", {
      status: 404,
      code: "ERR_NOT_FOUND",
    });
  }

  return contract;
}

module.exports = {
  getContractById,
};

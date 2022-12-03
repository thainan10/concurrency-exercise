const { Op } = require("sequelize");
const { Contract } = require("../model");
const { ERR_NOT_FOUND } = require("../utils/errors");

async function getContractById(profileId, contractId) {
  const contract = await Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    },
  });

  if (!contract) {
    throw ERR_NOT_FOUND("Contract not found");
  }

  return contract;
}

async function getContracts(profileId) {
  return await Contract.findAll({
    where: {
      status: { [Op.not]: "terminated" },
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    },
  });
}

module.exports = {
  getContractById,
  getContracts,
};

const { Op } = require("sequelize");
const { Job, Contract } = require("../model");

// Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.
async function getUnpaidJobs(profileId) {
  const unpaidJobs = await Job.findAll({
    where: {
      paid: { [Op.not]: true },
    },
    include: {
      model: Contract,
      required: true,
      where: {
        status: "in_progress",
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
      attributes: [],
    },
  });

  return unpaidJobs;
}

module.exports = {
  getUnpaidJobs,
};

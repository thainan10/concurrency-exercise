const { Op } = require("sequelize");
const {
  sequelize,
  Job,
  Contract,
  Profile,
  PROFILE_TYPE,
  CONTRACT_STATUS,
} = require("../model");
const {
  ERR_INVALID_PROFILE,
  ERR_NOT_FOUND,
  ERR_FORBIDDEN,
  ERR_JOB_ALREADY_PAID,
  ERR_NOT_ENOUGH_FUNDS,
} = require("../utils/errors");

async function getUnpaidJobs(profileId) {
  const unpaidJobs = await Job.findAll({
    where: {
      paid: { [Op.not]: true },
    },
    include: {
      model: Contract,
      required: true,
      where: {
        status: CONTRACT_STATUS.in_progress,
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
      attributes: [],
    },
  });

  return unpaidJobs;
}

async function payJob(profile, jobId) {
  // Another option is to remove the middleware from the route and get only the profile ID in the header, checking details in the transaction
  if (profile.type !== PROFILE_TYPE.client) {
    throw ERR_INVALID_PROFILE(`This operation is permitted only for clients`);
  }

  await sequelize.transaction(async (trx) => {
    const client = await Profile.findOne({
      where: {
        id: profile.id,
      },
      transaction: trx,
      lock: true,
    });

    if (client.type !== PROFILE_TYPE.client) {
      throw ERR_FORBIDDEN(`Contractors are not allowed to pay for jobs`);
    }

    const job = await Job.findOne({
      where: { id: jobId },
      include: {
        model: Contract,
        required: true,
        attributes: ["ClientId", "ContractorId"],
      },
      transaction: trx,
      lock: true,
    });

    if (!job) {
      throw ERR_NOT_FOUND(`Job not found`);
    }

    if (job.Contract.ClientId !== client.id) {
      throw ERR_FORBIDDEN(`This client doesn't own this job's contract`);
    }

    if (job.paid) {
      throw ERR_JOB_ALREADY_PAID(`This job was already paid`);
    }

    if (client.balance < job.price) {
      throw ERR_NOT_ENOUGH_FUNDS(
        `This client does not have enough funds to pay for this job`
      );
    }

    const contractor = await Profile.findOne({
      where: { id: job.Contract.ContractorId },
      transaction: trx,
      lock: true,
    });

    if (!contractor) {
      throw ERR_NOT_FOUND(`Contractor not found`);
    }

    if (contractor.type !== PROFILE_TYPE.contractor) {
      throw ERR_FORBIDDEN(`Clients are not allowed to receive job payments`);
    }

    await client.decrement({ balance: job.price }, { transaction: trx });
    await contractor.increment({ balance: job.price }, { transaction: trx });

    await Job.update(
      { paid: true, paymentDate: new Date() },
      {
        where: { id: jobId },
        transaction: trx,
        lock: true,
      }
    );
  });
}

module.exports = {
  getUnpaidJobs,
  payJob,
};

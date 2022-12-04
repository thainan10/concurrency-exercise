const { Op } = require("sequelize");
const { sequelize, Profile, Job, Contract } = require("../model");
const {
  ERR_INVALID_DEPOSIT_AMOUNT,
  ERR_DEPOSIT_OVER_LIMITED,
} = require("../utils/errors");

async function deposit(clientId, amount) {
  if (!amount || typeof amount !== "number" || amount <= 0) {
    throw ERR_INVALID_DEPOSIT_AMOUNT(`Invalid deposit amount`);
  }

  await sequelize.transaction(async (trx) => {
    const client = await Profile.findOne({
      where: { id: clientId },
      transaction: trx,
      lock: true,
    });

    const totalPriceJobsToPay = await Job.sum("price", {
      where: { paid: { [Op.not]: true } },
      include: {
        model: Contract,
        where: { ClientId: clientId },
      },
      transaction: trx,
    });
    const depositLimit = totalPriceJobsToPay * 0.25;

    if (amount > depositLimit) {
      throw ERR_DEPOSIT_OVER_LIMITED(`Deposit amount over the allowed limit`);
    }

    await client.increment({ balance: amount }, { transaction: trx });
  });
}

module.exports = {
  deposit,
};

const { Op } = require("sequelize");
const { sequelize, Profile, Contract, Job, PROFILE_TYPE } = require("../model");
const { ERR_INVALID_PARAMETER } = require("../utils/errors");

async function getBestProfessionInRange(dateRange) {
  const result = await Profile.findOne({
    where: { type: PROFILE_TYPE.contractor },
    attributes: [
      "profession",
      [sequelize.fn("SUM", sequelize.col("price")), "totalPayment"],
    ],
    group: ["profile.id"],
    order: [["totalPayment", "DESC"]],
    subQuery: false,
    limit: 1,
    include: {
      model: Contract,
      as: "Contractor",
      required: true,
      attributes: [],
      include: {
        model: Job,
        where: {
          paid: true,
          paymentDate: { [Op.between]: dateRange },
        },
        attributes: [],
      },
    },
  });

  return result && result.profession;
}

async function getBestClientsInRange(dateRange, limit = 2) {
  if (isNaN(+limit)) {
    throw ERR_INVALID_PARAMETER("Parameter limit has invalid type");
  }

  const clients = await Profile.findAll({
    where: { type: PROFILE_TYPE.client },
    attributes: [
      "id",
      [sequelize.literal(`firstName || ' ' || lastName`), "fullName"],
      [sequelize.fn("SUM", sequelize.col("price")), "paid"],
    ],
    group: ["profile.id"],
    order: [["paid", "DESC"]],
    subQuery: false,
    limit,
    include: {
      model: Contract,
      as: "Client",
      required: true,
      attributes: [],
      include: {
        model: Job,
        where: {
          paid: true,
          paymentDate: { [Op.between]: dateRange },
        },
        attributes: [],
      },
    },
  });

  return clients;
}

module.exports = {
  getBestProfessionInRange,
  getBestClientsInRange,
};

const { Op } = require("sequelize");
const { sequelize, Profile, Contract, Job } = require("../model");
const { ERR_INVALID_DATE } = require("../utils/errors");

async function getBestProfessionInRange(startDate, endDate) {
  if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
    throw ERR_INVALID_DATE("Date invalid");
  }

  const datesRange = [new Date(startDate), new Date(endDate)];

  const result = await Profile.findOne({
    where: { type: "contractor" },
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
          paymentDate: { [Op.between]: datesRange },
        },
        attributes: [],
      },
    },
  });

  return result && result.profession;
}

async function getBestClientsInRange(startDate, endDate, limit = 2) {
  if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
    throw ERR_INVALID_DATE("Date invalid");
  }

  const datesRange = [new Date(startDate), new Date(endDate)];

  const clients = await Profile.findAll({
    where: { type: "client" },
    attributes: {
      include: [[sequelize.fn("SUM", sequelize.col("price")), "totalPayment"]],
    },
    group: ["profile.id"],
    order: [["totalPayment", "DESC"]],
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
          paymentDate: { [Op.between]: datesRange },
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

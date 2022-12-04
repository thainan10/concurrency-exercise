const { Op } = require("sequelize");
const { sequelize, Profile, Contract, Job } = require("../model");

// Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
async function getBestProfessionInRange(startDate, endDate) {
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

module.exports = {
  getBestProfessionInRange,
};
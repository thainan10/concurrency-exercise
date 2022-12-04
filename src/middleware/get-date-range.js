const { ERR_INVALID_DATE } = require("../utils/errors");

const getDateRange = async (req, res, next) => {
  try {
    const {
      query: { start, end },
    } = req;

    if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
      throw ERR_INVALID_DATE("Date invalid");
    }

    req.dateRange = [new Date(start), new Date(end)];

    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports = { getDateRange };

const { deposit } = require("../../controllers/balances");

/**
 * Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
 *
 * If a new job is added at the moment of the deposit, it'll still consider only the ones in the DB for the deposit limit calculation;
 *
 * @returns true if the deposit was successful
 */
module.exports = async (req, res, next) => {
  const {
    params: { userId: clientId },
    body: { amount },
  } = req;

  try {
    await deposit(clientId, amount);

    return res.json(true);
  } catch (error) {
    return next(error);
  }
};

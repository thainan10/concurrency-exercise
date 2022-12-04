const { payJob } = require("../../controllers/jobs");

/**
 * Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.
 *
 * @returns true if the job was paid successfully
 */
module.exports = async (req, res, next) => {
  const {
    params: { job_id },
    profile,
  } = req;

  try {
    await payJob(profile, job_id);

    return res.json(true);
  } catch (error) {
    return next(error);
  }
};

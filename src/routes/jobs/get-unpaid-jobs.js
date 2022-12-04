const { getUnpaidJobs } = require("../../controllers/jobs");

/**
 * Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.
 *
 * @returns unpaid jobs for the user
 */
module.exports = async (req, res, next) => {
  const {
    profile: { id: profileId },
  } = req;

  try {
    const jobs = await getUnpaidJobs(profileId);

    return res.json(jobs);
  } catch (error) {
    return next(error);
  }
};

class ServerError extends Error {
  constructor(error, { status = 500, code = "ERROR" }) {
    super(error);

    this.status = status;
    this.code = code;
  }
}

function makeError(error, options, defaultOptions) {
  return new ServerError(error, options || defaultOptions);
}

module.exports = {
  ServerError,
  ERR_NOT_FOUND: (error, options) =>
    makeError(error, options, {
      status: 404,
      code: "ERR_NOT_FOUND",
    }),
  ERR_INVALID_PROFILE: (error, options) =>
    makeError(error, options, {
      status: 400,
      code: "ERR_INVALID_PROFILE",
    }),
  ERR_FORBIDDEN: (error, options) =>
    makeError(error, options, {
      status: 403,
      code: "ERR_FORBIDDEN",
    }),
  ERR_JOB_ALREADY_PAID: (error, options) =>
    makeError(error, options, {
      status: 403,
      code: "ERR_JOB_ALREADY_PAID",
    }),
  ERR_NOT_ENOUGH_FUNDS: (error, options) =>
    makeError(error, options, {
      status: 400,
      code: "ERR_NOT_ENOUGH_FUNDS",
    }),
  ERR_INVALID_DEPOSIT_AMOUNT: (error, options) =>
    makeError(error, options, {
      status: 400,
      code: "ERR_INVALID_DEPOSIT_AMOUNT",
    }),
  ERR_DEPOSIT_OVER_LIMITED: (error, options) =>
    makeError(error, options, {
      status: 400,
      code: "ERR_DEPOSIT_OVER_LIMITED",
    }),
  ERR_INVALID_DATE: (error, options) =>
    makeError(error, options, {
      status: 400,
      code: "ERR_INVALID_DATE",
    }),
};

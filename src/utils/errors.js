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
      status: 400,
      code: "ERR_NOT_FOUND",
    }),
};

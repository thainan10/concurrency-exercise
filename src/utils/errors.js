class ServerError extends Error {
  constructor(error, { status = 500, code = "ERROR" }) {
    super(error);

    this.status = status;
    this.code = code;
  }
}

module.exports = { ServerError };

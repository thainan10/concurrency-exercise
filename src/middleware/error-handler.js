module.exports = (error, req, res, next) => {
  const { message, status = 500, code = "ERROR" } = error;

  return res.status(status).json({ code, message });
};

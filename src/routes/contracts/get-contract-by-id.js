module.exports = async (req, res, next) => {
  try {
    const { Contract } = req.app.get("models");
    const { id } = req.params;
    const contract = await Contract.findOne({ where: { id } });
    if (!contract) return res.status(404).end();
    return res.json(contract);
  } catch (error) {
    return next(error);
  }
};

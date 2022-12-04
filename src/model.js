const Sequelize = require("sequelize");

const PROFILE_TYPE = {
  client: "client",
  contractor: "contractor",
};

const CONTRACT_STATUS = {
  new: "new",
  in_progress: "in_progress",
  terminated: "terminated",
};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

class Profile extends Sequelize.Model {}
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2),
    },
    type: {
      type: Sequelize.ENUM(Object.values(PROFILE_TYPE)),
    },
  },
  {
    sequelize,
    modelName: "Profile",
  }
);

class Contract extends Sequelize.Model {}
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(Object.values(CONTRACT_STATUS)),
    },
  },
  {
    sequelize,
    modelName: "Contract",
  }
);

class Job extends Sequelize.Model {}
Job.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: "Job",
  }
);

Profile.hasMany(Contract, { as: "Contractor", foreignKey: "ContractorId" });
Contract.belongsTo(Profile, { as: "Contractor" });
Profile.hasMany(Contract, { as: "Client", foreignKey: "ClientId" });
Contract.belongsTo(Profile, { as: "Client" });
Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
  PROFILE_TYPE,
  CONTRACT_STATUS,
  sequelize,
  Profile,
  Contract,
  Job,
};

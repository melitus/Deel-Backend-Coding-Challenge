const Sequelize = require('sequelize');
const ProfileModel = require('../api/v1/profile/profile.model');
const JobModel = require('../api/v1/job/job.model');
const ContractModel = require('../api/v1/contract/contract.model');
const logger = require('./logger');

const dbConfig = require('../config');

const sequelize = new Sequelize(dbConfig.db.development);

const Profile = ProfileModel(sequelize, Sequelize);
const Job = JobModel(sequelize, Sequelize);
const Contract = ContractModel(sequelize, Sequelize);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};

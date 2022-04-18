const { Op } = require('sequelize');

const getSingleContractById = async (req) => {
  const { Contract } = req.app.get('models');
  const profileId = req.profile.id;
  const foundContract = await Contract.findOne({
    where: {
      id: req.params.id,
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    },
  });
  return foundContract;
};

const getNonTerminatedUserContracts = async (req) => {
  const { Contract } = req.app.get('models');
  const profileId = req.profile.id;

  const foundContracts = await Contract.findAll({
    where: {
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      status: {
        [Op.ne]: 'terminated',
      },
    },
  });
  return foundContracts;
};

module.exports = { getSingleContractById, getNonTerminatedUserContracts };

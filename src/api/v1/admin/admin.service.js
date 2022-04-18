const { Op } = require('sequelize');

const getBestProfession = async (req) => {
  const { Job, Contract, Profile } = req.app.get('models');
  const { startDate, endDate } = req.query;
  const sequelize = req.app.get('sequelize');

  const bestProfessions = await Profile.findAll({
    attributes: ['profession', [sequelize.fn('SUM', sequelize.col('price')), 'earned']],
    include: [
      {
        model: Contract,
        as: 'Contractor',
        attributes: [],
        required: true,
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.gte]: startDate,
                [Op.lte]: endDate,
              },
            },
          },
        ],
      },
    ],
    where: {
      type: 'contractor',
    },
    group: ['profession'],
    order: [[sequelize.col('earned'), 'DESC']],
    limit: 1,
    subQuery: false,
  });

  return bestProfessions[0];
};

const findBestClients = async (req) => {
  const { Job, Contract, Profile } = req.app.get('models');
  const { startDate, endDate, limit } = req.query;
  const sequelize = req.app.get('sequelize');

  const limitThreshold = limit || 2;

  const bestClients = await Profile.findAll({
    attributes: [
      'id',
      [sequelize.literal("firstName || ' ' || lastName"), 'fullName'],
      [sequelize.fn('SUM', sequelize.col('price')), 'paid'],
    ],
    include: [
      {
        model: Contract,
        as: 'Client',
        attributes: [],
        required: true,
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.gte]: startDate,
                [Op.lte]: endDate,
              },
            },
          },
        ],
      },
    ],
    where: {
      type: 'client',
    },
    group: ['Profile.id'],
    order: [[sequelize.col('paid'), 'DESC']],
    limit: limitThreshold,
    subQuery: false,
  });

  return bestClients;
};

module.exports = {
  getBestProfession,
  findBestClients,
};

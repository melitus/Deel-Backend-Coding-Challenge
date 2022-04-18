/* eslint-disable eqeqeq */
const { Op } = require('sequelize');

const getUnpaidJobs = async (req) => {
  const { Job, Contract } = req.app.get('models');
  const profileId = req.profile.id;

  const foundPaidJob = await Job.findAll({
    include: [
      {
        attributes: [],
        model: Contract,
        required: true,
        where: {
          [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
          status: {
            [Op.eq]: 'in_progress',
          },
        },
      },
    ],
    where: {
      paid: {
        [Op.is]: null,
      },
    },
  });

  return foundPaidJob;
};

const payForAJob = async (req) => {
  const { Contract, Job, Profile } = req.app.get('models');
  const { id, balance, type } = req.profile;
  const jobId = req.params.id;
  const sequelize = req.app.get('sequelize');

  let response = '';
  const job = await Job.findOne({
    where: { id: jobId, paid: { [Op.is]: null } },
    include: [
      {
        model: Contract,
        where: { status: 'in_progress', ClientId: id },
      },
    ],
  });
  if (job) {
    if (type == 'client') {
      const amountToBePaid = job.price;
      const contractorId = job.Contract.ContractorId;
      if (balance >= amountToBePaid) {
        const paymentTransaction = await sequelize.transaction();
        try {
          await Promise.all([
            Profile.update(
              { balance: sequelize.literal(`balance - ${amountToBePaid}`) },
              { where: { id } },
              { transaction: paymentTransaction },
            ), // reduce client's balance

            Profile.update(
              { balance: sequelize.literal(`balance + ${amountToBePaid}`) },
              { where: { id: contractorId } },
              { transaction: paymentTransaction },
            ), // increase contractor's balance

            Job.update(
              { paid: 1, paymentDate: new Date() },
              { where: { id: jobId } },
              { transaction: paymentTransaction },
            ), // update job as paid
          ]);

          await paymentTransaction.commit();

          response = `Payment of ${amountToBePaid} for ${job.description} has been made successfully.`;
        } catch (error) {
          // If the execution reaches this line, an error was thrown.
          // We rollback the transaction.
          await paymentTransaction.rollback();

          response = `Payment of ${amountToBePaid} for ${job.description} failed. Please try again.`;
        }
      }
    }
  } else {
    response = `No record found for this job`;
  }

  return response;
};

module.exports = { getUnpaidJobs, payForAJob };

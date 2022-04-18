/* eslint-disable eqeqeq */
/* eslint-disable import/no-named-as-default-member */
const httpStatus = require('http-status');

const JobService = require('./job.service');

const getUnpaidJobs = async (req, res) => {
  try {
    const foundUnpaidJobs = await JobService.getUnpaidJobs(req);
    if (!foundUnpaidJobs) {
      res.status(httpStatus.NOT_FOUND).json({ success: true, message: 'No unpaid job found' });
    } else {
      res
        .status(httpStatus.OK)
        .json({ success: true, message: 'Unpaid job found successfully', data: foundUnpaidJobs });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while fetching unpaid jobs', Error: error });
  }
};

const payForAJob = async (req, res) => {
  try {
    const response = await JobService.payForAJob(req);
    if (typeof response === 'string' && response.includes('Job is already paid')) {
      res.status(httpStatus.NOT_FOUND).json({ success: false, message: `${response}` });
    } else if (response == '') {
      res.status(httpStatus.NOT_FOUND).json({ success: false, message: `Job not found` });
    } else if (typeof response === 'string' && response.includes('No record found for this job')) {
      res.status(httpStatus.NOT_FOUND).json({ success: false, message: `No record found for this job` });
    } else {
      res.status(httpStatus.OK).json({ success: true, message: 'Job paid successfully', data: response });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error occurred while paying for a job' });
  }
};

module.exports = {
  getUnpaidJobs,
  payForAJob,
};

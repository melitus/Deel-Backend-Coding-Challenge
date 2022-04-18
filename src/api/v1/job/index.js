const express = require('express');
const { getUnpaidJobs, payForAJob } = require('./job.controller');
const { getProfile } = require('../../../middleware/getProfile');

const jobRoutes = express.Router();

jobRoutes.get('/unpaid', getProfile, getUnpaidJobs);
jobRoutes.post('/:id/pay', getProfile, payForAJob);

module.exports = jobRoutes;

const express = require('express');

const { getSingleContractById, getNonTerminatedUserContracts } = require('./contract.controller');
const { getProfile } = require('../../../middleware/getProfile');

const contractRouter = express.Router();

contractRouter.get('/',getProfile, getNonTerminatedUserContracts);
contractRouter.get('/:id', getProfile, getSingleContractById);

module.exports = contractRouter;

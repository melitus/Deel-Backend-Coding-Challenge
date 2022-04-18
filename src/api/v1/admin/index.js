const express = require('express');
const { getBestClients, findBestProfession } = require('./admin.controller');

const contractRouter = express.Router();

contractRouter.get('/best-profession', findBestProfession);
contractRouter.get('/best-clients', getBestClients);

module.exports = contractRouter;

const express = require('express');
const { deposit } = require('./profile.controller');

const profileRoutes = express.Router();

profileRoutes.post('/deposit/:userId', deposit);

module.exports = profileRoutes;

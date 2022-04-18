const express = require('express');

const installApiEndpoints = require('../api/routes');
const { setupGlobalErrorMiddleware } = require('./error');
const { sequelize } = require('./database');

const app = express();

  app.set('trust proxy', true);
  app.disable('x-powered-by');
  app.set('sequelize', sequelize);
  app.set('models', sequelize.models);

  // Request body parsing middleware should be above methodOverride
  app.use(express.json({ limit: '300kb' })); // parse body params and attach them to req.body
  app.use(
    express.urlencoded({
      extended: true,
      limit: '300kb',
    }),
  );

  app.use('/v1/api', installApiEndpoints);
  setupGlobalErrorMiddleware(app);

  module.exports = app;


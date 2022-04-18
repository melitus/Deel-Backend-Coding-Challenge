/* eslint-disable import/prefer-default-export */
const { NotFoundError, errorHandler } = require('../error-handler');

exports.setupGlobalErrorMiddleware = (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => next(new NotFoundError()));

  // global error handler, send stacktrace only during development
  app.use(errorHandler);
};

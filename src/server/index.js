const express = require('express');

const app = require('../loaders');
const logger = require('../loaders/logger');

const port = 3001;

async function init() {
  try {
    app.listen(port, () => {
      logger.info('Express App Listening on Port 3001');
    });
  } catch (error) {
    logger.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

init();

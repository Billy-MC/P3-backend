import config from './config';
import express from 'express';
const app = require('./app');

async function startServer() {
  app.use(express.json());

  //await require('./loaders').default({ expressApp: app });

  app
    .listen(config.port, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      process.exit(1);
    });
}

startServer();

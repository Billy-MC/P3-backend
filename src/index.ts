import config from './config';
import app = require('./app');

async function startServer() {
  
  app
    .listen(config.port, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      console.log(err);
      process.exit(1);
    });
}

startServer();

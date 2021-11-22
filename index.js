const express = require('express');
const config = require('./src/config/app');
const app = require('./app');
const { connectToMongoDB } = require('./src/loaders/mongodb');

require('dotenv').config();

app.use(express.json());
connectToMongoDB();

async function startServer() {
	app.listen(config.port, err => {
		if (err) {
			process.exit(1);
			return;
		}
		console.log(`

################################################

🛡️ Server listening on port: ${config.port} 🛡️

################################################

`);
	});
}

startServer();

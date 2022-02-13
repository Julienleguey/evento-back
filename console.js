const fs = require('fs');
const path = require("path");
const repl = require('repl');
const models = require('./api/server/src/models');

// load all the models
Object.keys(models).forEach((modelName) => {
  global[modelName] = models[modelName];
});

// load all the services
fs.readdirSync("./api/services").forEach((file) => {
  const fileName = file.slice(0, -3);
  const servicePath = path.join(__dirname, "/api/services", file);
  const service = require(servicePath);

  global[fileName] = service;
});

const env = process.env.NODE_ENV.toUpperCase();

const replServer = repl.start({
  prompt: `Evento [${env}] > `,
});

replServer.context.db = models;

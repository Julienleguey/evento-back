const fs = require('fs');
const path = require("path");
const repl = require('repl');
const models = require('./api/server/src/models');

// load all the models
Object.keys(models).forEach((modelName) => {
  global[modelName] = models[modelName];
});

const env = process.env.NODE_ENV.toUpperCase();

const replServer = repl.start({
  prompt: `Evento [${env}] > `,
});

replServer.context.db = models;

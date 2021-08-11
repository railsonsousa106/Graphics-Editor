const knex = require("knex");
const { database } = require(".");

module.exports = knex(database);

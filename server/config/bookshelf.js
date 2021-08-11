const bookshelf = require("bookshelf");
const bookshelfUuid = require("bookshelf-uuid");
const knex = require("./knex");

module.exports = bookshelf(knex).plugin(bookshelfUuid);

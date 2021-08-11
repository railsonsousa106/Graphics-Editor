const bookshelf = require("../config/bookshelf");

/**
 * Board model.
 */

const Board = bookshelf.model("Board", {
  tableName: "boards",
  hasTimestamps: ["createdAt", "updatedAt"],
});

module.exports = Board;

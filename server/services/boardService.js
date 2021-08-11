const _ = require("lodash");
const Board = require("../models/board");

class BoardService {
  
  static async getByBoardName(boardName) {
    const board = await Board.where({ boardName: boardName }).fetch();
    return board;
  }

  static async getById(id) {
    const board = await Board.where({ id }).fetch();
    return board;
  }

  static async create(payload) {
    const board = await Board.forge(payload).save();
    return _.omit(board.toJSON(), ["createdAt", "updatedAt"]);
  }

  static async updateById(id, payload) {
    const board = await this.getById(id);
    await board.save(payload);
    return board;
  }

  static async updateByBoardBame(boardName, payload) {
    const board = await this.getByBoardName(boardName);
    const boardPayload = { ...payload };
    await board.save(boardPayload);
    return board;
  }
}

module.exports = BoardService;

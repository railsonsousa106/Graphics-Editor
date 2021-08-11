const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  baseURL: process.env.BASE_URL,
  port: process.env.PORT || 8080,
  database: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT || "3306",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: "utf8",
    },
    migrations: {
      tableName: "migrations",
      directory: `${process.cwd()}/server/migrations`,
    },
    seeds: {
      tableName: "seeds",
      directory: `${process.cwd()}/server/seeds`,
    },
    debug: false,
  },
};

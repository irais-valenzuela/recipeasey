const { config: _config } = require("dotenv");
const Sequelize = require("sequelize");
_config();

const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/recipeasey`;

const config = {
  logging: false,
  ssl: true,
};

const db = new Sequelize(dbUrl, config);

module.exports = db
const dotenv = require('dotenv');
dotenv.config()

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME_HVTAPP,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db_hvtapp = {};

db_hvtapp.Sequelize = Sequelize;
db_hvtapp.sequelize = sequelize;

db_hvtapp.user = require("../hvtapp/user.model")(sequelize, Sequelize);

module.exports = db_hvtapp;
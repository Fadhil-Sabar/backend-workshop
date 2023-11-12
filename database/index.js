const { Sequelize } = require('sequelize');
require("dotenv").config();

const database = new Sequelize(
  process.env.DB_SCEM,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    logging: console.log,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 550,
      min: 2,
      acquire: 30000,
      idle: 20000
    },
    "timezone": "+07:00"
  }
);  

module.exports = database
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/pymes.db");






module.exports = {
    sequelize,
    articulosfamilias,
    articulos,
  };
  
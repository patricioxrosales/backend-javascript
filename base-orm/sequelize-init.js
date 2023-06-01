const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/pymes.db");

const peliculas = sequelize.define(
  "peliculas",
  {
      Idpelicula:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true

      },
      Nombre: {
        // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nombre es requerido",
          },
          len: {
            args: [5, 45],
            msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
          },
        },
      },
      Idgenero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          notNull: {
            arg: true,
            msg:"Id genero es requerido"
          }
        }
      },

      fecha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha Alta es requerido",
          }
        }
      },

      duracion:{
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Codigo De Barra es requerido",
          },
          len: {
            args: [1, 3],
            msg: "la duracion debe estar entre 1 y 3 de longitud numeral",
          },
        }
      },

      actores:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "son requeridos los actores",
          }
        }

      }
  },
  
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (peliculas, options) {
        if (typeof peliculas.Nombre === "string") {
          peliculas.Nombre = peliculas.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }

);


const generos = sequelize.define(
  "generos",
  {
      Idgenero:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true

      },
      Nombre: {
        // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nombre es requerido",
          },
          len: {
            args: [3, 15],
            msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
          },
        },
      },

    },
  
    {
      // pasar a mayusculas
      hooks: {
        beforeValidate: function (generos, options) {
          if (typeof generos.Nombre === "string") {
            generos.Nombre = generos.Nombre.toUpperCase().trim();
          }
        },
      },
  
      timestamps: false,
    }
);

module.exports = {
    sequelize,
    peliculas,
    generos
  };
  
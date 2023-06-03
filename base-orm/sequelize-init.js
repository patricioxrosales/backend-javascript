const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/peliculas.db");

const plataformas = sequelize.define(
  "plataformas",
  {
    IdPlataforma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
        },
      },
    },
    Precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        args: true,
        msg: "precio es requerido",
      }
    }
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (plataformas, options) {
        if (typeof plataformas.Nombre === "string") {
          plataformas.Nombre = plataformas.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const actores = sequelize.define(
  "actores",
  {
    IdActores: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        }, 
      }, 
    },
    Apellido: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Apellido es requerido",
        },
      },
    },
    Nacionalidad: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nacionalidad es requerido",
        },
      },
    },
    FechaNacimiento: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Fecha es requerido",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: function (actores, options) {
        if (typeof actores.Nombre === "string") {
          actores.Nombre = actores.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

module.exports = {
    sequelize,
    plataformas,
    actores,
  };
  
const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


//get actores
router.get("/api/actores", async function (req, res, next) {
  // #swagger.tags = ['actores']
  // #swagger.summary = 'obtiene todos los actores'
  // consulta de articulos con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convierto el string a booleano
    where.Activo = req.query.Activo === "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.actores.findAndCountAll({
    attributes: [
      "IdActores",
      "Nombre",
      "Apellido",
      "Nacionalidad",
      "FechaNacimiento",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

//get por id actores
router.get("/api/actores/:id", async function (req, res, next) {
  // #swagger.tags = ['Actores']
  // #swagger.summary = 'obtiene un Actor'
  // #swagger.parameters['id'] = { description: 'identificador del Actor...' }
  let items = await db.actores.findOne({
    attributes: [
        "IdActores",
        "Nombre",
        "Apellido",
        "Nacionalidad",
        "FechaNacimiento",
    ],
    where: { IdActores: req.params.id },
  });
  res.json(items);
});

//post actores
router.post("/api/actores/", async (req, res) => {
  // #swagger.tags = ['Actores']
  // #swagger.summary = 'agrega un Actor'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Actor',
                schema: { $ref: '#/definitions/Actores' }
    } */
  try {
    let data = await db.actores.create({
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Nacionalidad: req.body.Nacionalidad,
      FechaNacimiento: req.body.FechaNacimiento,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

//put actores
router.put("/api/actores/:id", async (req, res) => {
  // #swagger.tags = ['Actores']
  // #swagger.summary = 'actualiza un actor'
  // #swagger.parameters['id'] = { description: 'identificador del actor...' }
  /*    #swagger.parameters['actor'] = {
                in: 'body',
                description: 'Actor a actualizar',
                schema: { $ref: '#/definitions/Actores' }
    } */

  try {
    let item = await db.actores.findOne({
      attributes: [
        "IdActores",
        "Nombre",
        "Apellido",
        "Nacionalidad",
        "FechaNacimiento",
      ],
      where: { IdActores: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Actor no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Apellido = req.body.Apellido;
    item.Nacionalidad = req.body.Nacionalidad;
    item.FechaNacimiento = req.body.FechaNacimiento;
    await item.save();

    res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

//delete actores
router.delete("/api/actores/:id", async (req, res) => {
  // #swagger.tags = ['Actores']
  // #swagger.summary = 'elimina un Actor'
  // #swagger.parameters['id'] = { description: 'identificador del Actor..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.actores.destroy({
      where: { IdActores: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let data = await db.sequelize.query(
        "UPDATE actores SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdActores = :IdActores",
        {
          replacements: { IdActores: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});
module.exports = router;

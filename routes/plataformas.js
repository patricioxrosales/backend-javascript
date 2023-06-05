const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


//get plataformas
router.get("/api/plataformas", async function (req, res, next) {
  let data = await db.plataformas.findAll({
    attributes: ["IdPlataforma", "Nombre","Precio"],
  });
  res.json(data);
});

//get por id plataformas
router.get("/api/plataformas/:id", async function (req, res, next) {
    let data = await db.plataformas.findAll({
      attributes: ["IdPlataforma", "Nombre","Precio"],
      where: { IdPlataforma: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
});

//post plataformas
router.post("/api/plataformas/", async (req, res) => {
  try {
    let data = await db.plataformas.create({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
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

//put plataformas
router.put("/api/plataformas/:id", async (req, res) => {

  try {
    let item = await db.plataformas.findOne({
      attributes: [
        "IdPlataforma",
        "Nombre",
        "Precio",
      ],
      where: { IdPlataforma: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Plataforma no encontrada" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Precio = req.body.Precio;
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

//delete plataformas
router.delete("/api/plataformas/:id", async (req, res) => {
  try{
    let bajaFisica = true;      
    if (bajaFisica) {
      let filasBorradas = await db.plataformas.destroy({
        where: { IdPlataforma: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    }} catch (err) {
        if (err instanceof ValidationError) {
          const messages = err.errors.map((x) => x.message);
          res.status(400).json(messages);
        } else {
          throw err;
        }
      }
    }
);

module.exports = router;

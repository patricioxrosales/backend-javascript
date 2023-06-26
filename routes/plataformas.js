const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/plataformas", async function (req, res, next){

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
          [Op.like]: "%" + req.query.Nombre + "%",
      };
  }

  try {
    const Items = await db.plataformas.findAndCountAll({
      attributes: ["IdPlataforma", "Nombre", "Precio"],
      order: [["Nombre", "ASC"]],
      where,
    });

    res.json(Items.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/api/plataforma/:id", async function (req, res, next){
    let Items = await db.plataformas.findOne({
        attributes: [
          "IdPlataforma",
          "Nombre",
          "Precio",
      ],
        where: { IdPlataforma: req.params.id },
    });
    res.json(Items );
    });


router.post("/api/plataformas/", async (req, res) => {
    try {
        let data = await db.plataformas.create({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Nacionalidad: req.body.Nacionalidad,
            FechaNacimiento: req.body.FechaNacimiento,
        });
       res.status(200).json(data);
       } catch (err) {
           res.status(400).json("no se ha podido completar la accion");
       }
    });


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
          res.status(404).json({ message: "Plataforma no encontrado" });
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

router.delete("/api/plataformas/:id", async (req, res) => {
        try{
        let bajaFisica = true;      
        if (bajaFisica) {
          let filasBorradas = await db.plataformas.destroy({
            where: { Idpelicula: req.params.id },
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
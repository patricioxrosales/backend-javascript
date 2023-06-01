const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const Route = require("express/lib/router/route");


router.get("/api/peliculas", async function (req, res, next){

    let Items = await db.peliculas.findAll({
        attributes: ["Idpelicula", "Nombre","Idgenero", "fecha", "duracion", "actores"],
      });
      res.json(Items);
    });

router.get("/api/peliculas/:id", async function (req, res, next){
    let Items = await db.peliculas.findOne({
        attributes: [
          "Idpelicula",
          "Nombre",
          "Idgenero",
          "fecha",
          "duracion",
          "actores",
        ],
        where: { Idpelicula: req.params.id },
    });
    res.json(Items );
    });


router.post("/api/peliculas/", async (req, res) => {
    try {
        let data = await db.peliculas.create({
            Nombre: req.body.Nombre,
            Idgenero: req.body.Idgenero,
            fecha: req.body.fecha,
            duracion: req.body.duracion,
            actores: req.body.actores,
        });
       res.status(200).json(data);
       } catch (err) {
           res.status(400).json("no se ha podido completar la accion");
       }
    });


router.put("/api/peliculas/:id", async (req, res) => {
    try {
        let item = await db.peliculas.findOne({
          attributes: [
            "Idpelicula",
            "Nombre",
            "Idgenero",
            "fecha",
            "duracion",
            "actores",
            ],
          where: { Idpelicula: req.params.id },
        });
        if (!item) {
          res.status(404).json({ message: "Articulo no encontrado" });
          return;
        }
        item.Nombre = req.body.Nombre;
        item.Idgenero = req.body.Idgenero;
        item.fecha = req.body.fecha;
        item.duracion = req.body.duracion;
        item.actores = req.body.actores;
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

router.delete("/api/peliculas/:id", async (req, res) => {
        try{
        let bajaFisica = true;      
        if (bajaFisica) {
          let filasBorradas = await db.peliculas.destroy({
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
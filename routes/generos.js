const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op } = require("sequelize");

router.get("/api/generos", async function (req, res, next){

    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
        where.Nombre = {
            [Op.like]: "%" + req.query.Nombre + "%",
        };
    }
    try {
      const Items = await db.generos.findAndCountAll({
        attributes: ["Idgenero", "Nombre"],
        order: [["Nombre", "ASC"]],
        where,
      });
  
      res.json(Items.rows);
    } catch (error) {
      next(error);
    }
  });

router.get("/api/generos/:id", async function (req, res, next){
    let items = await db.generos.findOne({
        attributes: [
            "Idgenero",
            "Nombre",
        ],
        where: { Idgenero: req.params.id },
    });
    res.json(items );
    });

router.post("/api/generos/", async (req, res) => {
    try {
        let data = await db.generos.create({
            Nombre: req.body.Nombre
        });
        res.status(200).json(data);
        } catch (err) {
           res.status(400).json("no se ha podido completar la accion");
        }
    });

router.put("/api/generos/:id", async (req, res) => {
    try {
        let item = await db.generos.findOne({
            attributes: [
            "Idgenero",
            "Nombre"
            ],
        where: { Idgenero: req.params.id },
        });
        if (!item) {
            res.status(404).json({ message: "genero no encontrada" });
            return;
        }
        item.Idgenero  = req.params.id
        item.Nombre = req.body.Nombre;
        await item.save();
        res.sendStatus(200);
        } catch (err) {
            res.status(400).json("no se ha podido completar la accion");
        }
});
    
  module.exports = router;
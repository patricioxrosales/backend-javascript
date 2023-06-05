const express = require("express");
const app = express();
require("./base-orm/sqlite-init");
app.use(express.json());

const GenerosRouter = require("./routes/generos");

const PeliculasRouter = require("./routes/peliculas");

const plataformasRouter = require("./routes/plataformas");

const actoresRouter = require("./routes/actores");

app.use(PeliculasRouter);

app.use(GenerosRouter)

app.use(plataformasRouter);

app.use(actoresRouter);

app.get("/", (req, res) => {
    res.send(" Bienvenido al PPAI-DDS Del grupo 14");
  });
  
  if (!module.parent) {
    const port = 4000;
    app.listen(port, () => {
        console.log(`sitio escuchando en el puerto ${port}`);
    });
    
    }

module.exports = app;
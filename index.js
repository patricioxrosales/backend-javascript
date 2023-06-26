const express = require("express");
const cors = require("cors")
const app = express();
require("./base-orm/sqlite-init");
app.use(express.json());
app.use(cors());

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
  
  if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
    const port = process.env.PORT || 4000;   // en produccion se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  

module.exports=app;
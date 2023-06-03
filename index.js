const express = require("express");
const app = express();
require("./base-orm/sqlite-init");
app.use(express.json());

const plataformasRouter = require("./routes/plataformas");
app.use(plataformasRouter);

const actoresRouter = require("./routes/actores");
app.use(actoresRouter);

if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
  
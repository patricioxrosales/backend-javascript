const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/peliculas.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'plataformas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table plataformas( IdPlataforma INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Precio);"
    );
    console.log("tabla plataformas creada!");
    await db.run(
      "insert into plataformas values	(1,'Netflix',700),(2,'Amazon Prime',1300),(3,'HBO MAX',1200),(4,'STAR+',1000),(5,'Paramount+',900);"
    );
  }
  
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'actores'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table actores( IdActores INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL , Apellido text NOT NULL , Nacionalidad text NOT NULL , FechaNacimiento text );"
    );
    console.log("tabla actores creada!");
    await db.run(
      "insert into actores values	(1,'Brad','Pitt','Estadounidense','1970-01-01'),(2,'Brad','Pitt','Estadounidense','1970-01-01'),(3,'Brad','Pitt','Estadounidense','1970-01-01'),(4,'Brad','Pitt','Estadounidense','1970-01-01'),(5,'Brad','Pitt','Estadounidense','1970-01-01');"
    );
  }
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;




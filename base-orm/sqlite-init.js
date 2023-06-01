const db = require("aa-sqlite");


async function CrearBaseSiNoExiste() {
    // abrir base, si no existe el archivo/base lo crea
    await db.open("./.data/pymes.db");
    //await db.open(process.env.base);
  
    let existe = false;
    let res = null;
  

    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'generos'",
        []
      );
      if (res.contar > 0) existe = true;
      if (!existe) {
        await db.run(
          "CREATE table generos( Idgenero INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL);"
        );
        console.log("tabla generos creada!");
        await db.run(
          "insert into generos values	(1,'ACCION'),(2,'ROMANCE'),(3,'TERROR'),(4,'COMEDIA'),(5,'DRAMA'),(6,'ROMCOM'),(7,'TRHILLER'),(8,'SUSPENSO'),(9,'MISTERIO'),(10,'AVENTURA');"
        );
      }


    existe = false;

    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        `CREATE table peliculas(
                Idpelicula INTEGER PRIMARY KEY AUTOINCREMENT
                ,Nombre text NOT NULL
                ,Idgenero INTEGER NOT NULL
                ,fecha text
                ,duracion text
                ,actores text,
                FOREIGN KEY (Idgenero) REFERENCES Generos(Idgenero)); `
      );
      console.log("tabla peliculas creada!");
      await db.run(
        "insert into peliculas values	(1,'son como niños',2,'22 de julio de 2010','102','(Adam Sandle, Kevin James)'),(2,'ironman',1,'14 de abril de 2008','126','(Robert Downey Jr., Terrence Howardm,Gwyneth Paltrow,Jeff Bridges)');"
      );
    }
    existe = false;
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;

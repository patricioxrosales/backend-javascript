const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/peliculas.db");
  
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
        "insert into peliculas values	(1,'Son como niños',2,'22 de julio de 2010','102','(Adam Sandler, Kevin James)'),(2,'Ironman',1,'14 de abril de 2008','126','(Robert Downey Jr., Terrence Howardm,Gwyneth Paltrow,Jeff Bridges)'),(3,'Interestelar',10,'26 de octubre de 2014','169','(Anne Hathaway, Matthew McConaughey)'),(4,'IT',3,'21 de septiembre de 2017','135','(Jaeden Martell, Bill Skarsgård)'),(5,'Avatar',10,'18 de diciembre de 2009','162','(Zoe Saldaña, Sam Worthington)'),(6,'El club de la pelea',5,'14 de noviembre de 1999','139','(Brad Pitt, Edward Norton)'),(7,'Rapidos y Furiosos',1,'22 de junio de 2001','107','(Vin Diesel, Paul Walker)'),(8,'Star Wars IV',10,'25 de mayo de 1977','162','(Harrinson Ford, Mark Hamill)'),(9,'Creed',1,'25 de noviembre de 2015','133','(Michael B Jordan, Sylvester Stallone)'),(10,'Casino',8,'22 de noviembre de 1995','178','(Robert De Niro, Sharon Stone)')"
      );
    }
  
    existe = false;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'plataformas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table plataformas( IdPlataforma INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Precio text NOT NULL);"
    );
    console.log("tabla plataformas creada!");
    await db.run(
      "insert into plataformas values	(1,'Netflix',700),(2,'Amazon Prime',1300),(3,'HBO MAX',1200),(4,'STAR+',1000),(5,'Paramount+',900),(6,'Apple TV',1400),(7,'Flow',700),(8,'Directv GO',1000),(9,'Movistar Play',500),(10,'Lionsgate +',1300);"
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
      "CREATE table actores( IdActores INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL , Apellido text NOT NULL , Nacionalidad text NOT NULL , FechaNacimiento text);"
    );
    console.log("tabla actores creada!");
    await db.run(
      "insert into actores values	(1,'Brad','Pitt','Estadounidense','1970-01-01'),(2,'Leonardo','Dicaprio','Estadounidense','1970-01-01'),(3,'Ricardo','Darin','Argentino','1970-01-01'),(4,'Zac','Effron','Estadounidense','1970-01-01'),(5,'Ben','Affleck','Estadounidense','1970-01-01'),(6,'Robert','Downey JR','Estadounidense','1970-01-01'),(7,'Adam','Sandler','Estadounidense','1970-01-01'),(8,'Matt','Damon','Estadounidense','1970-01-01'),(9,'Anne','Hathaway','Estadounidense','1970-01-01'),(10,'Guillermo','Francela','Argentino','1970-01-01');"
    );
  }
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;




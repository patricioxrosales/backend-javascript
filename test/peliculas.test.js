const request = require("supertest");
const app = require("../index");


const peliculaAlta = {
    Nombre: "pelicula " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    Idgenero: 3,
    fecha: "23/09/2004",
    duracion: "124",
    actores: "(billy y mandy)",
  };

const peliculaModificacion = {
    Idpelicula:23,
    Nombre: "pelicula " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    Idgenero: 2,
    fecha: "23/09/2004",
    duracion: "124",
    actores: "(billy y mandy)",
  };

describe("GET /api/peliculas/", () => {
    it("Deberia devolver todas las peliculas", async () => {
      const res = await request(app).get("/api/peliculas/");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Idpelicula: expect.any(Number),
            Nombre: expect.any(String),
            Idgenero: expect.any(Number),
            fecha: expect.any(String),
            duracion: expect.any(String),
            actores: expect.any(String),
          })
        ]),
      );
    });
  });

describe("GET /api/peliculas/:id", () => {
    it("Deberia devolver la pelicula con el id 1 ", async () => {
      const res = await request(app).get("/api/peliculas/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            Idpelicula: expect.any(Number),
            Nombre: expect.any(String),
            Idgenero: expect.any(Number),
            fecha: expect.any(String),
            duracion: expect.any(String),
            actores: expect.any(String)
        })
      );
    });
  });
  
describe("POST /api/peliculas/", () => {
    it("Deberia devolver la pelicula que acabo de crear", async () => {
      const res = await request(app).post("/api/peliculas/").send(peliculaAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            Idpelicula: expect.any(Number),
            Nombre: expect.any(String),
            Idgenero: expect.any(Number),
            fecha: expect.any(String),
            duracion: expect.any(String),
            actores: expect.any(String),
          
        })
      );
    });
  });
  
describe("PUT /api/peliculas/:id", () => {
    it("Deberia devolver la pelicula con el id 1 modificado", async () => {
      const res = await request(app).put("/api/peliculas/1").send(peliculaModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  
describe("DELETE /api/peliculas/:id", () => {
    it("Deberia devolver la pelicula con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/peliculas/1");
      expect(res.statusCode).toEqual(200);
    });
});
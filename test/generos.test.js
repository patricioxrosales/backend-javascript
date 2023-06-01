const request = require("supertest");
const app = require("../index");


const generosAlta = {
    Nombre: "mamen" 
  };

const generosModificacion = {
    Nombre: "genero 234324 "
  };

describe("POST /api/generos/", () => {
    it("Deberia devolver el genero que acabo de crear", async () => {
      const res = await request(app).post("/api/generos/").send(generosAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            Idgenero: expect.any(Number),
            Nombre: expect.any(String),
        })
      );
    });
    });

describe("PUT /api/generos/:id", () => {
    it("Deberia devolver el genero con el id 1 modificado", async () => {
      const res = await request(app).put("/api/generos/1").send(generosModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });

describe("GET /api/generos/", () => {
    it("Deberia devolver todos los generos", async () => {
      const res = await request(app).get("/api/generos/");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Idgenero: expect.any(Number),
            Nombre: expect.any(String),
          })
        ]),
      );
    });
  });

describe("GET /api/generos/:id", () => {
    it("Deberia devolver el genero con el id 1", async () => {
      const res = await request(app).get("/api/generos/3");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            Idgenero: expect.any(Number),
            Nombre: expect.any(String),
        })
      );
    });
  });
  
const request = require("supertest");
const app = require("../index");
const actorAlta = {
  Nombre: "Actor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Apellido: "Actor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un apellido aleatorio
  Nacionalidad:"estadonidense",
  FechaNacimiento: "1970-01-01",
};
const actorModificacion = {
  IdArticulo: 1,
  Nombre: "Actor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Apellido: "Actor " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un apellido aleatorio
  Nacionalidad: "estadonidense",
  FechaNacimiento: "1970-01-01",
};


// test route/actores GET
describe("GET /api/actores", () => {
  it("Deberia devolver todos los actores", async () => {
    const res = await request(app).get("/api/actores");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
          IdActores: expect.any(Number),
          Nombre: expect.any(String),
          Apellido: expect.any(String),
          Nacionalidad: expect.any(String),
          FechaNacimiento: expect.any(String),
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/actores/:id GET
describe("GET /api/actores/:id", () => {
  it("Deberia devolver el actor con el id 1", async () => {
    const res = await request(app).get("/api/actores/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdActores: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),
        Nacionalidad: expect.any(String),
        FechaNacimiento: expect.any(String),
      })
    );
  });
});

// test route/actores POST
describe("POST /api/actores", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/actores").send(actorAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdActores: expect.any(Number),
        Nombre: expect.any(String),
        Apellido: expect.any(String),
        Nacionalidad: expect.any(String),
        FechaNacimiento: expect.any(String),
      })
    );
  });
});

// test route/actores/:id PUT
describe("PUT /api/actores/:id", () => {
  it("Deberia devolver el actor con el id 1 modificado", async () => {
    const res = await request(app).put("/api/actores/1").send(actorModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/actores/:id DELETE
describe("DELETE /api/actores/:id", () => {
  it("Deberia devolver el actor con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/actores/1");
    expect(res.statusCode).toEqual(200);
    
    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );

  });
});

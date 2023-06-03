const request = require("supertest");
const app = require("../index");
const plataformaAlta = {
  Nombre: "Plataforma " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
};
const plataformaModificacion = {
  IdArticulo: 1,
  Nombre: "Plataforma " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
};


// test route/plataformas GET
describe("GET /api/plataformas", () => {
  it("Deberia devolver todos las plataformas", async () => {
    const res = await request(app).get("/api/plataformas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
          IdPlataforma: expect.any(Number),
          Nombre: expect.any(String),
          Precio: expect.any(Number),
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/plataformas/:id GET
describe("GET /api/plataformas/:id", () => {
  it("Deberia devolver la plataforma con el id 1", async () => {
    const res = await request(app).get("/api/plataformas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
      })
    );
  });
});

// test route/plataformas POST
describe("POST /api/plataformas", () => {
  it("Deberia devolver la plataforma que acabo de crear", async () => {
    const res = await request(app).post("/api/plataformas").send(plataformaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdPlataforma: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
      })
    );
  });
});

// test route/plataformas/:id PUT
describe("PUT /api/plataformas/:id", () => {
  it("Deberia devolver la plataforma con el id 1 modificado", async () => {
    const res = await request(app).put("/api/plataformas/1").send(articuloModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/plataformas/:id DELETE
describe("DELETE /api/plataformas/:id", () => {
  it("Deberia devolver la plataforma con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/plataformas/1");
    expect(res.statusCode).toEqual(200);
    
    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdPlataforma: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );

  });
});


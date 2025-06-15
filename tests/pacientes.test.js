const request = require('supertest');
const express = require('express');
const pacientesRouter = require('../routes/pacientes');
const db = require('../db');

const app = express();
app.use(express.json());
app.use('/pacientes', pacientesRouter);

beforeAll((done) => {
  db.serialize(() => {
    db.run("DELETE FROM pacientes", done); // limpia antes de probar
  });
});

test('POST /pacientes debe crear un paciente', async () => {
  const res = await request(app)
    .post('/pacientes')
    .send({ nombre: 'Ana', edad: 28, genero: 'Femenino' });

  expect(res.statusCode).toBe(200);
  expect(res.body.nombre).toBe('Ana');
});

test('GET /pacientes debe devolver al menos 1 paciente', async () => {
  const res = await request(app).get('/pacientes');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThanOrEqual(1);
});

// routes/pacientes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear paciente
router.post('/', (req, res) => {
  const { nombre, edad, genero } = req.body;
  const sql = 'INSERT INTO pacientes (nombre, edad, genero) VALUES (?, ?, ?)';
  db.run(sql, [nombre, edad, genero], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nombre, edad, genero });
  });
});

// Obtener todos los pacientes
router.get('/', (req, res) => {
  db.all('SELECT * FROM pacientes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener un paciente por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM pacientes WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(row);
  });
});

// Actualizar paciente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, edad, genero } = req.body;
  const sql = 'UPDATE pacientes SET nombre = ?, edad = ?, genero = ? WHERE id = ?';
  db.run(sql, [nombre, edad, genero, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Paciente actualizado correctamente' });
  });
});

// Eliminar paciente
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM pacientes WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Paciente eliminado correctamente' });
  });
});

module.exports = router;

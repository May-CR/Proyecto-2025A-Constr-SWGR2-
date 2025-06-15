// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./pacientes.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
    db.run(`
      CREATE TABLE IF NOT EXISTS pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        edad INTEGER,
        genero TEXT
      )
    `);
  }
});

module.exports = db;

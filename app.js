// app.js
const express = require('express');
const path = require('path');
const app = express();
const pacientesRoutes = require('./routes/pacientes');

app.use(express.json());
app.use('/pacientes', pacientesRoutes);
app.use(express.static(path.join(__dirname, 'public'))); // Servir frontend

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

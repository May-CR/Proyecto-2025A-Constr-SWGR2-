const form = document.getElementById('formulario');
const tabla = document.getElementById('tabla-pacientes');

let editando = false;
let idPacienteEditar = null;

async function cargarPacientes() {
  const res = await fetch('/pacientes');
  const pacientes = await res.json();

  tabla.innerHTML = '';
  pacientes.forEach(p => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.edad}</td>
      <td>${p.genero}</td>
      <td>
        <button onclick="eliminarPaciente(${p.id})">Eliminar</button>
        <button onclick="cargarFormulario(${p.id}, '${p.nombre}', ${p.edad}, '${p.genero}')">Editar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const edad = parseInt(document.getElementById('edad').value);
  const genero = document.getElementById('genero').value;

  if (editando) {
    // PUT
    await fetch(`/pacientes/${idPacienteEditar}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, edad, genero })
    });
    editando = false;
    idPacienteEditar = null;
    form.querySelector('button').textContent = 'Agregar';
  } else {
    // POST
    await fetch('/pacientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, edad, genero })
    });
  }

  form.reset();
  cargarPacientes();
});

function cargarFormulario(id, nombre, edad, genero) {
  document.getElementById('nombre').value = nombre;
  document.getElementById('edad').value = edad;
  document.getElementById('genero').value = genero;

  editando = true;
  idPacienteEditar = id;
  form.querySelector('button').textContent = 'Actualizar';
}

async function eliminarPaciente(id) {
  await fetch(`/pacientes/${id}`, { method: 'DELETE' });
  cargarPacientes();
}

cargarPacientes();

// Importar Express
const express = require('express');
const app = express();

// Hacer que Express sepa que vamos a recibir y enviar JSON
app.use(express.json());

// Datos de prueba: un arreglo de objetos
let usuarios = [
  { id: 1, nombre: 'Juan', edad: 28 },
  { id: 2, nombre: 'Ana', edad: 22 },
  { id: 3, nombre: 'Luis', edad: 35 }
];
// Endpoint Inicial

app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST con Express.js');
  });

// Endpoint: Obtener todos los usuarios

app.get('/api/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

// Endpoint: Obtener un usuario por ID

app.get('/api/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === usuarioId);
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  res.status(200).json(usuario);
});

// Endpoint: Crear un nuevo usuario

app.post('/api/usuarios', (req, res) => {
  const { nombre, edad } = req.body;
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// Endpoint: Actualizar un usuario

app.put('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado');

  const { nombre, edad } = req.body;
  usuario.nombre = nombre || usuario.nombre;
  usuario.edad = edad || usuario.edad;

  res.status(200).json(usuario);
});

// Endpoint: Eliminar un usuario

app.delete('/api/usuarios/:id', (req, res) => {
  const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (usuarioIndex === -1) return res.status(404).send('Usuario no encontrado');

  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
  res.status(200).json('usuarioEliminado');
});

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

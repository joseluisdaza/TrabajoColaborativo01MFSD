// Importar Express
const express = require("express");
const app = express();

// Hacer que Express sepa que vamos a recibir y enviar JSON
app.use(express.json());

// Datos de prueba: un arreglo de objetos
let usuarios = [
  { id: 1, nombre: "Juan", edad: 28 },
  { id: 2, nombre: "Ana", edad: 22 },
  { id: 3, nombre: "Luis", edad: 35 },
];

// Endpoint Inicial. Solo es el el endpoint de inicio del API.
//Retorna un mensaje de bienvenida
app.get("/", (req, res) => {
  res.send("Bienvenido a la API REST con Express.js");
});

// Endpoint: Recupera toda la lista de usuarios
//Retorna StatusCode: 200 y la lista de usuariosdel sistema
app.get("/api/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});

// Endpoint: Obtener un usuario por ID
// Obtiene el id del usuario de los parametros.
//Status Code 200 con la informacion del usuario en formato json.
//Status code 404 cuando el usuario no se encontró junto mensaje de error.
app.get("/api/usuarios/:id", (req, res) => {
  const usuarioId = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) return res.status(404).send("Usuario no encontrado");
  res.status(200).json(usuario);
});

// Endpoint: Crear un nuevo usuario
//Recupera el nombre y edad del body.
//Retorna status code 201 con el nuevo usuario en formato json.
app.post("/api/usuarios", (req, res) => {
  const { nombre, edad } = req.body;
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad,
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// Endpoint: Actualizar un usuario
//Status Code 200, Retorna el usuario actualizado en formato json,
//                si es que este se encuentra en la base de datos.
//Status Code 404, Retorna mensaje de error porque no hay un usuario con el id proporcionado.
app.put("/api/usuarios/:id", (req, res) => {
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send("Usuario no encontrado");

  const { nombre, edad } = req.body;
  usuario.nombre = nombre || usuario.nombre;
  usuario.edad = edad || usuario.edad;

  res.status(200).json(usuario);
});

// Endpoint: Eliminar un usuario
//Status Code 200: Retorna un mensaje de usuario eliminado si es que este ha sido encontrado.
//Status Code 404: Retorna un mensaje de Usuario no encontrado y no realiza ningún borrado.
app.delete("/api/usuarios/:id", (req, res) => {
  const usuarioIndex = usuarios.findIndex(
    (u) => u.id === parseInt(req.params.id)
  );
  if (usuarioIndex === -1) return res.status(404).send("Usuario no encontrado");

  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
  res.status(200).json("Usuario Eliminado");
});

// Configurar el puerto y levantar el servidor
// Obtiene el puerto de las variables de entorno, en caso de no existir variables de entorno setea 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

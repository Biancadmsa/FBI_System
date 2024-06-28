const express = require("express");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { create } = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 3000;


const agentes = require("./data/agentes.js");

const hbs = create({
  extname: ".handlebars",
  defaultLayout: false,
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get('/iniciarSesion', (req, res) => {
  const { email, password } = req.query;
  const agente = agentes.results.find((agente) => agente.email === email && agente.password === password);

  if (agente) {
    const token = jwt.sign(
      { email: agente.email },
      process.env.SECRET,
      { expiresIn: '60s' }
    );

    const expiresAt = Math.round(Date.now() / 1000) + 60;
    const expiresInSec = expiresAt - Math.floor(Date.now() / 1000); // Calcular expiresInSec aquí

    res.render('autenticado', { 
      email: agente.email,
      token,
      expiresAt,
      expiresInSec // Pasar expiresInSec como parte de los datos renderizados
    });
  } else {
    res.status(401).send('Error en la autenticación');
  }
});


// Ruta restringida
app.get("/rutaRestringida", (req, res) => {
  const token = req.query.token; // Obtener el token de la query string

  if (!token) {
    return res.status(401).send("No autorizado. Token no proporcionado.");
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("No autorizado. Token inválido o expirado.");
    }
    // Renderizar la plantilla Handlebars con el email decodificado
    res.render('rutarestringida', { email: decoded.email });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

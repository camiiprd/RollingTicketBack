// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicializar Express
const app = express();
app.use(cors());

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/miDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema
const aboutUsSchema = new mongoose.Schema({
  title: String,
  text: String,
  img: String,
  githubLink: String,
});

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

// Ruta para obtener los datos de AboutUs
app.get('/about-us', async (req, res) => {
  try {
    const aboutUsData = await AboutUs.find();
    res.json(aboutUsData);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
});

// Escuchar en un puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

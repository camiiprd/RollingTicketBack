import mongoose from 'mongoose';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Para cargar las variables de entorno

// Inicializar Express
const app = express();
app.use(cors({
  origin: 'http://localhost:4000/api/AboutUs', // Cambia esto si tu frontend está en otro dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Conectar a MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mongodb.net/miDB`, {
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
    console.log('Datos obtenidos de MongoDB:', aboutUsData);  // Verificar los datos
    res.json(aboutUsData);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
});

// Escuchar en un puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default mongoose.model('AboutUs',aboutUsSchema)
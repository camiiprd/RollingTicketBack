import mongoose from "mongoose";
// Definir el esquema
const aboutUsSchema = new mongoose.Schema({
    title:{String} ,
    text:{String} ,
    img:{String} ,
    githubLink: {String},
  });
  
  export default  mongoose.model('AboutUs', aboutUsSchema);
  
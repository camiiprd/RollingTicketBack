import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
    // phone: {
    //     type: String,
    //     required: true
    // },
    // address: {
    //     street: {
    //         type: String,
    //         required: true
    //     },
    //     number: {
    //         type: Number,
    //         required: true
    //     },
    //     city:{
    //         type: String,
    //         required: true
    //     },
    //     state: {
    //         type: String,
    //         required: true
    //     },
    //     zipCode: {
    //         type: String,
    //         required: true
    //     }
    // },
    // roles: {
    //     type: String,
    //     default: 'user'
    // } ,
    // profilePicture: {
    //     type: String, // Esto almacenará la URL de la foto
    //     default: ''  // Por si el usuario no sube una imagen
    // }
},{ timestamps: true})

export default mongoose.model('User', userSchema);

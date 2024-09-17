import User from '../models/user.model.js'; 
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser';
import {  createAccessToken, encryptedPassword } from '../utils/protect-data.js';

export const register = async (req, res) => {
    try {
        const { userName, password, email, phone, address, roles } = req.body;

        // Encriptar la contraseña
        const encryptedPwd = await encryptedPassword(password);

        // Crear un nuevo usuario usando el modelo User
        const newUser = new User({
            userName,
            password: encryptedPwd, // Usa el campo 'password' del modelo
            email,
            phone,
            address: {
                street: address.street,
                number: address.number,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode
            },
            roles: roles || 'user' // Asegúrate de que roles esté definido o tenga un valor predeterminado
        });

        // Guardar el usuario en la base de datos
        const userSaved = await newUser.save();
        res.status(201).json(userSaved);
    } catch (error) {
        console.error('Error en la creación del usuario:', error); // Añadir log detallado para depuración
        res.status(500).json({ message: 'Error creando usuario', error: error.message });
    }
};


//login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar mail y password
        if (!email || !password) {
            return res.status(400).json({ message: 'email y contraseña son requeridos' });
        }

        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ message: 'usuario no encontrado' });
        }

        // Verificar contraseña

        const isPasswordCorrect = await bcrypt.compare(password, userFound.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'contraseña incorrecta' });
        }

        const token = createAccessToken(userFound._id)
        
        console.log(token)
        //almacenar token
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            sameSites: 'None',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({message: 'login exitoso', token, user: userFound})
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};


export const logout = async (req, res) => {
    res.status(200).json({ message: 'Logout exitoso' });
}

// ELIMINAR USUARIO

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await User.findByIdAndDelete(id);
        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado', user: userFound });
    }
    catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
}
// MOSTRAR USUARIOS

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};


//ACTUALIZAR USUARIOS

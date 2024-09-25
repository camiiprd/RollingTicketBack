import User from '../models/user.model.js'; 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {   encryptedPassword } from '../utils/protect-data.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        const { userName, password, email, phone, address, roles, profilePicture } = req.body;

        // Validaciones de la contraseña (longitud mínima, mayúsculas, símbolos)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.' });
        }

        // Encriptar la contraseña
        const encryptedPwd = await encryptedPassword(password);

        // Crear un nuevo usuario usando el modelo User
        const newUser = new User({
            userName,
            password: encryptedPwd,
            email,
            phone,
            address: {
                street: address.street,
                number: address.number,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode
            },
            roles: roles || 'user',
            profilePicture: profilePicture || ''  // Almacenar la URL de la imagen
        });

        // Guardar el usuario en la base de datos
        const userSaved = await newUser.save();
        res.status(201).json(userSaved);
    } catch (error) {
        console.error('Error en la creación del usuario:', error);
        res.status(500).json({ message: 'Error creando usuario', error: error.message });
    }
};


// Crear un token de acceso
const createAccessToken = (userId, userRoles) => {
    return jwt.sign(
        { id: userId, roles: userRoles }, // Incluimos el id y roles en el payload del token
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // El token expira en 1 hora
    );
};

// Función de login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar mail y password
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const isPasswordCorrect = await bcrypt.compare(password, userFound.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Crear el token incluyendo el rol del usuario
        const token = createAccessToken(userFound._id, userFound.roles);
        
        console.log(token);

        // Almacenar token en una cookie
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000 // La cookie dura 1 día
        });

        // Respuesta exitosa con token y datos del usuario
        res.status(200).json({ message: 'Login exitoso', token, user: userFound });
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

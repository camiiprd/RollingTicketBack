import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { encryptedPassword } from '../utils/protect-data.js';

dotenv.config();

// Generar Token JWT
const createAccessToken = (userId, userRoles) => {
    return jwt.sign(
        { id: userId, roles: userRoles }, // Payload del token
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // Expiración del token
    );
};

// Registro de usuarios
export const register = async (req, res) => {
    try {
        const { userName, password, email, phone, address, roles, profilePicture } = req.body;

        // Validación de contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.' });
        }

        // Encriptar contraseña
        const encryptedPwd = await encryptedPassword(password);

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
            profilePicture: profilePicture || '' 
        });

        const userSaved = await newUser.save();
        res.status(201).json(userSaved);
    } catch (error) {
        res.status(500).json({ message: 'Error creando usuario', error: error.message });
    }
};

// Login de usuarios
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userFound.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = createAccessToken(userFound._id, userFound.roles);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });

        res.status(200).json({
            message: 'Login exitoso',
            token,
            user: {
                id: userFound._id,
                email: userFound.email,
                roles: userFound.roles
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

// Logout de usuarios
export const logout = async (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });
    res.status(200).json({ message: 'Logout exitoso' });
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await User.findByIdAndDelete(id);
        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado', user: userFound });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};

// Obtener lista de usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, email, phone, address, roles, profilePicture } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                userName,
                email,
                phone,
                address: {
                    street: address.street,
                    number: address.number,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zipCode
                },
                roles,
                profilePicture: profilePicture || ''
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

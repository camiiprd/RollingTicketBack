import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// encriptar contraseña

export const encryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// comparar contraseñas

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

// Crear token
export const createAccessToken = (userId) => {
    const expiresIn = process.env.JWT_SECRET_IN || '1h'; // Valor predeterminado de 1 hora
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};
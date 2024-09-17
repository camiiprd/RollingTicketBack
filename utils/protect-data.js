import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

// encriptar contraseña

export const encryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// comparar contraseñas

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

// // Crear token
// export const createAccessToken = (user) => {
//     const expiresIn = '1h'; // Valor predeterminado de 1 hora
//     return jwt.sign({ userId: user._id, roles: user.roles }, JWT_SECRET, { expiresIn });
// };
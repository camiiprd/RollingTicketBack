import bcrypt from 'bcryptjs'

// encriptar contraseña

export const encryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// comparar contraseñas

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}
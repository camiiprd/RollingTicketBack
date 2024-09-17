import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js'; 

export const verifyToken = (req, res, next) => {
    try {
        // Obtener el token de las cookies o del header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        // Verificar el token
        jwt.verify(token, JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({ message: 'Token inválido' });
            }

            req.user = decoded;

            next();
        });
    } catch (error) {
        
        console.error('Error en la verificación del token:', error);
    res.status(500).json({ message: 'Error en la verificación del token' });
    }  
};

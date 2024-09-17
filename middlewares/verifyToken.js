import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; 

// Middleware para verificar el rol
export const verifyRole = (roles) => {
    return async (req, res, next) => {
        try {
            // Obtener el token del encabezado de autorización
            const token = req.headers.authorization?.split(" ")[1]; // El token debe estar en formato: "Bearer token"
            console.log('que hay aqui?', token)
            if (!token) {
                return res.status(401).json({ message: 'Acceso no autorizado. No se proporcionó token.' });
            }

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Buscar al usuario en la base de datos para obtener su rol
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            // Verificar si el rol del usuario es uno de los roles permitidos
            if (!roles.includes(user.roles)) {
                return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta.' });
            }

            // Si todo está bien, continuar con la siguiente función middleware
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Error en la verificación de roles.', error: error.message });
        }
    };
};

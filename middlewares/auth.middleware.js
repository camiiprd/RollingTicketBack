// auth.middleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        // Verificar que se haya enviado el token
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' });
        }

        // Extraer el token
        const token = authHeader.split(' ')[1]; // Obtener el token después de "Bearer "

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Almacenar la información decodificada del usuario en req.user para usarla después
        req.user = decoded;

        next(); // Pasar al siguiente middleware o controlador
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado', error: error.message });
    }
};


// auth.middleware.js
export const restrictTo = (roles) => {
    return (req, res, next) => {
        const userRoles = req.user.roles;

        // Verificar si el usuario tiene al menos uno de los roles permitidos
        const hasAccess = roles.some(role => userRoles.includes(role));

        if (!hasAccess) {
            return res.status(403).json({
                message: 'No tienes permiso para realizar esta acción'
            });
        }

        next();
    };
};

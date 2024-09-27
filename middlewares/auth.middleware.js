import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.userId;
        req.userRole = decoded.roles;
        next();
    });
};

const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).send({ message: 'Forbidden!' });
        }
        next();
    };
};

export { verifyToken, restrictTo };
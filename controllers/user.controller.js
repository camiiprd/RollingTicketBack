import User from '../models/user.model.js'; // Asegúrate de que el modelo esté correctamente importado
import { comparePassword, createAccessToken, encryptedPassword } from '../utils/protect-data.js';

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
        const isPasswordCorrect = await comparePassword(password, userFound.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'contraseña incorrecta' });
        }

        // crear token
        const accessToken = createAccessToken(userFound._id);
        res.status(200).json({ message: 'login exitoso', accessToken, user: userFound });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};


export const logout = async (req, res) => {
    res.status(200).json({ message: 'Logout exitoso' });
}
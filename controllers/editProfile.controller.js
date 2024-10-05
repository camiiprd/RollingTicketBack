import User from '../models/user.model.js';

// Controlador para editar el perfil del usuario
export const editUserProfile = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la ruta
    const {
        userName,
        email,
        phone,
        address: {
            street,
            number,
            city,
            state,
            zipCode
        },
        profilePicture
    } = req.body; // Obtiene los datos de la solicitud

    try {
        // Busca y actualiza el usuario en la base de datos
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                userName,
                email,
                phone,
                address: {
                    street,
                    number,
                    city,
                    state,
                    zipCode
                },
                profilePicture
            },
            { new: true } // new: true devuelve el documento actualizado
        );

        // Si no se encuentra el usuario, devuelve un error 404
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devuelve el usuario actualizado
        res.status(200).json(updatedUser);
    } catch (error) {
        // Manejo de errores
        console.error('Error al actualizar el perfil:', error.message); // Imprime el error en la consola
        res.status(500).json({ message: 'Error al actualizar el perfil del usuario. Intenta de nuevo más tarde.' });
    }
};

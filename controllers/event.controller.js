import event from '../models/event.model.js';


//CREAR EVENTO
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, image } = req.body;
        const newEvent = new event({ title, description, date, location, image });
        const eventSaved = await newEvent.save();
        res.status(201).json(eventSaved);
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ message: 'Error al crear evento', error: error.message });
    }
};
//OBTENER EVENTOS
export const getEvents = async (req, res) => {
    try {
        const events = await event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
};
//OBTENER EVENTO POR ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const eventFound = await event.findById(id);
        if (!eventFound) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(eventFound);
    } catch (error) {
        console.error('Error al obtener evento:', error);
        res.status(500).json({ message: 'Error al obtener evento', error: error.message });
    }
};
//ACTUALIZAR EVENTO
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location, image } = req.body;
        const eventUpdated = await event.findByIdAndUpdate(id, { title, description, date, location, image }, { new: true });
        if (!eventUpdated) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(eventUpdated);
    }
    catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(500).json({ message: 'Error al actualizar evento', error: error.message });
    }
}
//ELIMINAR EVENTO
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const eventFound = await event.findByIdAndDelete(id);
        if (!eventFound) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json({ message: 'Evento eliminado', event: eventFound });
    }
    catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ message: 'Error al eliminar evento', error: error.message });
    }
}


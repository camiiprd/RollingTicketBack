import { Router } from 'express';
import { Contact } from '../models/contact.model.js'; 

const router = Router();


router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    
    const newContact = new Contact({ name, email, subject, message });

    
    await newContact.save();

    res.status(201).json({ message: 'Mensaje guardado correctamente.' });
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).json({ error: 'Error al guardar el mensaje.' });
  }
});

export default router;

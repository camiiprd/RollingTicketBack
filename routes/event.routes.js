import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller.js';
import { verifyToken, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getEvents);
router.get('/:id', verifyToken, getEventById);
router.post('/', verifyToken, restrictTo(['admin', 'event_manager']), createEvent);
router.put('/:id', verifyToken, restrictTo(['admin', 'event_manager']), updateEvent);
router.delete('/:id', verifyToken, restrictTo(['admin']), deleteEvent);

export default router;
import express from 'express';
import { editUserProfile } from '../controllers/editProfile.controller.js';

const router = express.Router();

router.put('/update/:id', editUserProfile);

export default router;

import express from 'express';
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import categoryRoutes from './routes/category.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import { createRole } from './utils/roles.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
createRole();
app.use(cookieParser());

// Habilita CORS
app.use(cors());

app.use('/api/usuarios', userRoutes);
app.use('/api/eventos', eventRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/purchases', purchaseRoutes);

export default app;
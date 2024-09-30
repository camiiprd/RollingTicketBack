import express from 'express';
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import categoryRoutes from './routes/category.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import contactRoutes from './routes/contact.routes.js';

import { createRole } from './utils/roles.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import stockRoutes from './routes/productRoutes.js';

const app = express();
app.use(express.json());
createRole();
app.use(cookieParser());
app.use(express.json());


// Habilita CORS
app.use(cors());

app.use('/api/usuarios', userRoutes);
app.use('/api/eventos', eventRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api', contactRoutes);
app.use('/api/stock', stockRoutes);

export default app;
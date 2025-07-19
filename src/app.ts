import dataRoutes from './routes/data.routes';
import express from 'express';

const app = express();
app.use(express.json());

app.use('/data', dataRoutes);

export default app;

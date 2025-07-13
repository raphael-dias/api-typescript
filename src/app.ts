import dataRoutes from './routes/data.routes';
const express = require('express');

const app = express();
app.use(express.json());

app.use('/data', dataRoutes);

export default app;

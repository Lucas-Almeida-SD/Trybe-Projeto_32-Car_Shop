import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import carRoute from './routes/Car.route';
import motorcycleRoute from './routes/Motorcycle.route';

const app = express();
app.use(express.json());
app.use(carRoute);
app.use(motorcycleRoute);

app.use(errorMiddleware);

export default app;

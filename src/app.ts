import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger.output.json';
import errorMiddleware from './middlewares/errorMiddleware';
import carRoute from './routes/Car.route';
import motorcycleRoute from './routes/Motorcycle.route';

const app = express();
app.use(express.json());
app.use(carRoute);
app.use(motorcycleRoute);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorMiddleware);

export default app;

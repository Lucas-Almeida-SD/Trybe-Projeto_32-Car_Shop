import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.service';
import MotorcycleController from '../controllers/Motorcycle.controller';

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcycleRoute = Router();

motorcycleRoute.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
motorcycleRoute.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
motorcycleRoute.get('/motorcycles/:id', (req, res) => motorcycleController.readOne(req, res));
motorcycleRoute.put('/motorcycles/:id', (req, res) => motorcycleController.update(req, res));

export default motorcycleRoute;

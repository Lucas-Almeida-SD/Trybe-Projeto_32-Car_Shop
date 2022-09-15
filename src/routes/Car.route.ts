import { Router } from 'express';
import CarController from '../controllers/Car.controller';
import CarModel from '../models/Car.model';
import CarService from '../services/Car.service';

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

const carRoute = Router();

carRoute.post('/cars', (req, res) => carController.create(req, res));
carRoute.get('/cars', (req, res) => carController.read(req, res));
carRoute.get('/cars/:id', (req, res) => carController.readOne(req, res));
carRoute.put('/cars/:id', (req, res) => carController.update(req, res));
carRoute.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default carRoute;

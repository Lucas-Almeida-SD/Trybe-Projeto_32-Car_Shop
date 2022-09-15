import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.service';
import MotorcycleController from '../controllers/Motorcycle.controller';

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcycleRoute = Router();

const resource = '/motorcycles';

motorcycleRoute.post(`${resource}`, (req, res) => motorcycleController.create(req, res));
motorcycleRoute.get(`${resource}`, (req, res) => motorcycleController.read(req, res));
motorcycleRoute.get(`${resource}/:id`, (req, res) => motorcycleController.readOne(req, res));
motorcycleRoute.put(`${resource}/:id`, (req, res) => motorcycleController.update(req, res));
motorcycleRoute.delete(`${resource}/:id`, (req, res) => motorcycleController.delete(req, res));

export default motorcycleRoute;

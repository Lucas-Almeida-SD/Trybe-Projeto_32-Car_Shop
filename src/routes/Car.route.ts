import { Router } from "express";
import CarController from "../controllers/Car.controller";
import CarModel from "../models/Car.model";
import CarService from "../services/Car.service";

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

const carRoute = Router();

carRoute.post('/cars', (req, res) => carController.create(req, res));

export default carRoute;

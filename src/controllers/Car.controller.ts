import { Request, Response } from "express";
import httpStatusCode from "../helpers/httpStatusCode";
import { ICar } from "../interfaces/ICar";
import { IService } from "../interfaces/IService";

class CarController {
  constructor(private service: IService<ICar>) {}

  public async create(
    req: Request,
    res: Response<ICar>,
  ) {
    const createdCar = await this.service.create(req.body);

    res.status(httpStatusCode.CREATED).json(createdCar);
  }
}

export default CarController;

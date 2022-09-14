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

  public async read(
    _req: Request,
    res: Response<ICar[]>,
  ) {
    const carList = await this.service.read();

    res.status(httpStatusCode.OK).json(carList);
  }

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const { id } = req.params;

    const car = await this.service.readOne(id);

    res.status(httpStatusCode.OK).json(car);
  }
}

export default CarController;

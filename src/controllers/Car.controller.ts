import { Request, Response } from 'express';
import httpStatusCode from '../helpers/httpStatusCode';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

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

  public async update(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;
    const newCarInfo = req.body;

    const updatedCar = await this.service.update(id, newCarInfo);

    res.status(httpStatusCode.OK).json(updatedCar);
  }

  public async delete(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;

    await this.service.delete(id);

    res.status(httpStatusCode.NO_CONTENT).end();
  }
}

export default CarController;

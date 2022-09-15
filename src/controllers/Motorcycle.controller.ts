import { Request, Response } from 'express';
import HttpStatusCode from '../helpers/httpStatusCode';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  constructor(private service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response<IMotorcycle>) {
    const createdMotorcycle = await this.service.create(req.body);

    res.status(HttpStatusCode.CREATED).json(createdMotorcycle);
  }

  public async read(req: Request, res: Response<IMotorcycle[] | []>) {
    const motorcycleList = await this.service.read();

    res.status(HttpStatusCode.OK).json(motorcycleList);
  }
}

export default MotorcycleController;

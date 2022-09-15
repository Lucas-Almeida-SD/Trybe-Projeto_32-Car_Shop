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

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;

    const motorcycle = await this.service.readOne(id);

    res.status(HttpStatusCode.OK).json(motorcycle);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    
    const updatedMotorcycle = await this.service.update(id, req.body);
    
    res.status(HttpStatusCode.OK).json(updatedMotorcycle);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.delete(id);

    res.status(HttpStatusCode.NO_CONTENT).end();
  }
}

export default MotorcycleController;

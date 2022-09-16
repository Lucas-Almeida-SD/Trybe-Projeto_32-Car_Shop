import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import Validate from '../validations/Validate';

class CarService implements IService<ICar> {
  constructor(private model: IModel<ICar>) {}

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this.model.create(obj as ICar);
  }

  public async read(): Promise<ICar[]> {
    return this.model.read();
  }

  public async readOne(_id: string): Promise<ICar> {
    Validate.IdLength(_id);
  
    const carFound = await this.model.readOne(_id);

    if (!carFound) throw new Error(ErrorTypes.objectNotFound);

    return carFound;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    Validate.IdLength(_id);

    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const updatedCar = await this.model.update(_id, obj as ICar);

    if (!updatedCar) throw new Error(ErrorTypes.objectNotFound);

    return updatedCar;
  }

  public async delete(_id: string): Promise<ICar> {
    Validate.IdLength(_id);

    const removedCar = await this.model.delete(_id);

    if (!removedCar) throw new Error(ErrorTypes.objectNotFound);

    return removedCar;
  }
}

export default CarService;

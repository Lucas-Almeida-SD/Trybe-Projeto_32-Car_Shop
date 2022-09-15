import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';
import MotorcycleValidate from '../validations/Motorcycle.validate';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private model: IModel<IMotorcycle>) {}

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const createdMotorcycle = await this.model.create(obj as IMotorcycle);

    return createdMotorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    return this.model.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    MotorcycleValidate.validateIdLength(_id);

    const motorcycle = await this.model.readOne(_id);

    if (!motorcycle) throw new Error(ErrorTypes.objectNotFound);

    return motorcycle;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    MotorcycleValidate.validateIdLength(_id);

    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const updatedMotorcycle = await this.model.update(
      _id,
      obj as IMotorcycle,
    );

    if (!updatedMotorcycle) throw new Error(ErrorTypes.objectNotFound);

    return updatedMotorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    MotorcycleValidate.validateIdLength(_id);

    const removedMotorcycle = await this.model.delete(_id);

    if (!removedMotorcycle) throw new Error(ErrorTypes.objectNotFound);

    return removedMotorcycle;
  }
}

export default MotorcycleService;

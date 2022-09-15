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

  update(_id: string, obj: unknown): Promise<{ status?: boolean | undefined; model: string; year: number; color: string; buyValue: number; category: 'Street' | 'Custom' | 'Trail'; engineCapacity: number; }> {
    throw new Error('Method not implemented.');
  }
  delete(_id: string): Promise<{ status?: boolean | undefined; model: string; year: number; color: string; buyValue: number; category: 'Street' | 'Custom' | 'Trail'; engineCapacity: number; }> {
    throw new Error('Method not implemented.');
  }
}

export default MotorcycleService;

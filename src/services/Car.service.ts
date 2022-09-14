import { carZodSchema, ICar } from "../interfaces/ICar";
import { IModel } from "../interfaces/IModel";
import { IService } from "../interfaces/IService";

class CarService implements IService<ICar> {
  constructor(private model: IModel<ICar>) {}

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this.model.create(obj as ICar);
  }

  public async read(): Promise<ICar[]> {
    throw new Error("Method not implemented.");
  }

  public async readOne(_id: string): Promise<ICar> {
    throw new Error("Method not implemented.");
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    throw new Error("Method not implemented.");
  }

  public async delete(_id: string): Promise<ICar> {
    throw new Error("Method not implemented.");
  }
}

export default CarService;

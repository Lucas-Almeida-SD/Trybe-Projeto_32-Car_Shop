import { Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: Model<T>) {}

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    return this.model.findOne({ _id });
  }

  public async update(_id: string, obj: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(
      { _id },
      { ...obj, $unset: { __v: '' } },
      { 
        returnOriginal: false,
      },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ _id });
  }
}

export default MongoModel;

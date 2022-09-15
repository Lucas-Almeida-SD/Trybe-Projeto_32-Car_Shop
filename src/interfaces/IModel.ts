import { UpdateQuery } from 'mongoose';

export interface IModel<T> {
  create(obj: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  update(_id: string, obj: UpdateQuery<T>): Promise<T | null>;
  remove(_id: string): Promise<T | null>;
}

export default {};

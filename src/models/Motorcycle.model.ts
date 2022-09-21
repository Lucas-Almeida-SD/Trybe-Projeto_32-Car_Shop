import { model as createModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: {
    type: String,
    enum: ['Street', 'Custom', 'Trail'],
  },
  engineCapacity: Number,
}, {
  versionKey: false,
});

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = createModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default MotorcycleModel;

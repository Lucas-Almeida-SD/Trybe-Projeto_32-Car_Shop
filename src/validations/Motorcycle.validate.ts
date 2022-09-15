import { ErrorTypes } from '../errors/catalog';

export default abstract class MotorcycleValidate {
  public static validateIdLength(_id: string) {
    if (_id.length < 24) throw new Error(ErrorTypes.idLengthNotAllowed);
  }
}
import { ErrorTypes } from '../errors/catalog';

export default abstract class Validate {
  public static IdLength(_id: string) {
    if (_id.length < 24) throw new Error(ErrorTypes.idLengthNotAllowed);
  }
}
import httpStatusCode from '../helpers/httpStatusCode';

export enum ErrorTypes {
  objectNotFound = 'objectNotFound',
  idLengthNotAllowed = 'idLengthNotAllowed',
}

type ErrorObject = {
  message: string,
  httpStatus: number,
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorObject;
};

export const errorCatalog: ErrorCatalog = {
  objectNotFound: {
    message: 'Object not found',
    httpStatus: httpStatusCode.NOT_FOUND,
  },
  idLengthNotAllowed: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: httpStatusCode.BAD_REQUEST,
  },
};
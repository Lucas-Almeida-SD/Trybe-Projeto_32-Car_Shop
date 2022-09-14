import { ErrorRequestHandler } from "express"
import { ZodError } from "zod"
import { errorCatalog, ErrorTypes } from "../errors/catalog"
import httpStatusCode from "../helpers/httpStatusCode"

const errorMiddleware: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(httpStatusCode.BAD_REQUEST).json({ message: err.issues })
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if(mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
}

export default errorMiddleware;

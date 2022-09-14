import { ErrorRequestHandler } from "express"
import { ZodError } from "zod"
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

  return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
}

export default errorMiddleware;

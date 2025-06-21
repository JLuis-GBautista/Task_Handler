import HTTPError from "./HTTPError";

export const errorHandler = (error: unknown) => {
  const httpError = error as HTTPError;
  const statusCode = httpError.statusCode ?? 500;
  const typeError =
    httpError.name
      ? statusCode !== 500
        ? httpError.name
        : "Error del servidor: " + httpError.name
      : "Error del servidor";
  const message = httpError.message ?? typeError;
  return { statusCode, typeError, message };
}
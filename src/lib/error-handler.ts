import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { isProductionNodeEnv } from "./env-validation.js";
import { errorBody } from "./utils.js";

export function globalErrorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  request.log.error(error);

  if (error.validation) {
    const message = isProductionNodeEnv()
      ? "Request validation failed."
      : error.message;
    return reply.code(400).send(errorBody("VALIDATION_ERROR", message));
  }

  if (error.statusCode === 401) {
    const message = isProductionNodeEnv() ? "Unauthorized." : error.message;
    return reply.code(401).send(errorBody("UNAUTHORIZED", message));
  }

  if (error.statusCode === 429) {
    const message = isProductionNodeEnv() ? "Too many requests." : error.message;
    return reply.code(429).send(errorBody("RATE_LIMITED", message));
  }

  reply.code(error.statusCode ?? 500).send(errorBody("INTERNAL_ERROR", "Ocorreu um erro interno no servidor."));
}

import { FastifyInstance } from "fastify";
import { errorBody } from "../lib/utils.js";

export async function registerBillingRoutes(app: FastifyInstance) {
  // Stripe Webhook
  app.post("/api/v1/billing/webhooks/stripe", {
    schema: { 
      hide: true,
      tags: ["Billing"],
      description: "Webhook Stripe (assinaturas, pagamentos e mudanças de plano)."
    }
  }, async (_req) => {
    return { received: true };
  });

  // PagSeguro Webhook
  app.post("/api/v1/billing/webhooks/pagseguro", {
    schema: { hide: true, tags: ["Billing"], description: "Webhook PagSeguro (placeholder)." }
  }, async (_req, reply) => {
    return reply.code(501).send(errorBody("NOT_IMPLEMENTED", "Webhook PagSeguro ainda não configurado."));
  });

  // PayPal Webhook
  app.post("/api/v1/billing/webhooks/paypal", {
    schema: { hide: true, tags: ["Billing"], description: "Webhook PayPal (placeholder)." }
  }, async (_req, reply) => {
    return reply.code(501).send(errorBody("NOT_IMPLEMENTED", "Webhook PayPal ainda não configurado."));
  });
}

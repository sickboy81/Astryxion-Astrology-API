import { FastifyInstance } from "fastify";
import { z } from "zod";

const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function registerPortalAuthRoutes(app: FastifyInstance, userStore: any) {
  
  app.post("/api/v1/users/register", { schema: { hide: true } }, async (req, reply) => {
    const parsed = AuthSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "VALIDATION_ERROR", message: "Invalid email or password (min 6 chars)." });
    }

    try {
      // By default new signups are standard 'user'
      const user = await userStore.registerUser(parsed.data.email, parsed.data.password, "user");
      
      // Auto-login after registration
      const session = await userStore.login(parsed.data.email, parsed.data.password);
      return { ok: true, session, user: { email: user.email, role: user.role } };
    } catch (e: any) {
      if (e.message === "USER_EXISTS") {
        return reply.code(400).send({ error: "USER_EXISTS", message: "Email already registered." });
      }
      return reply.code(500).send({ error: "INTERNAL_ERROR", message: "Failed to register." });
    }
  });

  app.post("/api/v1/users/login", { schema: { hide: true } }, async (req, reply) => {
    const parsed = AuthSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "VALIDATION_ERROR", message: "Invalid data." });
    }

    const session = await userStore.login(parsed.data.email, parsed.data.password);
    if (!session) {
      return reply.code(401).send({ error: "UNAUTHORIZED", message: "Invalid email or password." });
    }

    return { ok: true, session };
  });

  app.post("/api/v1/users/logout", { schema: { hide: true } }, async (req, reply) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      await userStore.logout(token);
    }
    return { ok: true };
  });

  app.get("/api/v1/users/me", { schema: { hide: true } }, async (req, reply) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send({ error: "UNAUTHORIZED", message: "No session token." });
    }
    
    const token = authHeader.substring(7);
    const session = await userStore.getSession(token);
    
    if (!session) {
      return reply.code(401).send({ error: "UNAUTHORIZED", message: "Expired or invalid session." });
    }

    return { ok: true, email: session.email, role: session.role };
  });
}

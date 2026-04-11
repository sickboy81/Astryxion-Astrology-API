import Redis from "ioredis";
import crypto from "node:crypto";
import { jsonParseSafe } from "./utils.js";
import { getResolvedApiKeyHashSecret } from "./env-validation.js";

export type UserRole = "user" | "admin";

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
  preferredLang?: string;
}

export interface SessionRecord {
  token: string;
  email: string;
  role: UserRole;
  expiresAt: number;
}

export function createUserStore(redis: Redis | null) {
  const inMemoryUsers = new Map<string, string>(); // email -> json string
  const inMemorySessions = new Map<string, string>(); // token -> json string

  function hashPassword(password: string): string {
    // Basic SHA-256 for demonstration. In production, use bcrypt/argon2.
    const pepper = getResolvedApiKeyHashSecret();
    return crypto.createHash("sha256").update(password + pepper).digest("hex");
  }

  async function getUser(email: string): Promise<UserRecord | null> {
    const key = `auth:users:${email}`;
    let raw: string | null = null;
    
    if (redis) {
      raw = await redis.get(key);
    }
    if (!raw) {
      raw = inMemoryUsers.get(key) || null;
    }
    
    return raw ? jsonParseSafe<UserRecord>(raw) : null;
  }

  async function registerUser(email: string, passwordPlain: string, role: UserRole = "user"): Promise<UserRecord> {
    const existing = await getUser(email);
    if (existing) throw new Error("USER_EXISTS");

    const user: UserRecord = {
      id: `usr_${crypto.randomBytes(12).toString("hex")}`,
      email,
      passwordHash: hashPassword(passwordPlain),
      role,
      createdAt: new Date().toISOString()
    };

    const key = `auth:users:${email}`;
    const json = JSON.stringify(user);
    
    if (redis) {
      await redis.set(key, json);
    }
    inMemoryUsers.set(key, json);

    return user;
  }

  async function login(email: string, passwordPlain: string): Promise<SessionRecord | null> {
    const user = await getUser(email);
    if (!user) return null;

    if (user.passwordHash !== hashPassword(passwordPlain)) {
      return null;
    }

    const token = `sess_${crypto.randomBytes(24).toString("base64url")}`;
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
    
    const session: SessionRecord = {
      token,
      email: user.email,
      role: user.role,
      expiresAt
    };

    const key = `auth:sessions:${token}`;
    const json = JSON.stringify(session);

    if (redis) {
      await redis.set(key, json, "EX", 60 * 60 * 24);
    }
    inMemorySessions.set(key, json);

    return session;
  }

  async function getSession(token: string): Promise<SessionRecord | null> {
    const key = `auth:sessions:${token}`;
    let raw: string | null = null;
    
    if (redis) {
      raw = await redis.get(key);
    }
    if (!raw) {
      raw = inMemorySessions.get(key) || null;
    }

    if (!raw) return null;

    const session = jsonParseSafe<SessionRecord>(raw);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      await logout(token);
      return null;
    }

    return session;
  }

  async function logout(token: string) {
    const key = `auth:sessions:${token}`;
    if (redis) await redis.del(key);
    inMemorySessions.delete(key);
  }

  async function updateUser(email: string, updates: Partial<UserRecord>): Promise<void> {
    const user = await getUser(email);
    if (!user) throw new Error("USER_NOT_FOUND");
    
    const updated = { ...user, ...updates };
    const key = `auth:users:${email}`;
    const json = JSON.stringify(updated);
    
    if (redis) await redis.set(key, json);
    inMemoryUsers.set(key, json);
  }

  async function setupDefaultAdmin() {
    // Auto-create/Reset an admin for easy access (useful if hashing secret changes)
    try {
      const adminEmail = "admin@astro.api";
      const user = await getUser(adminEmail);
      if (!user) {
        await registerUser(adminEmail, "admin123", "admin");
        if (process.env.NODE_ENV === "development") {
          console.log(`Default admin user created (${adminEmail}). Set a strong password in production.`);
        }
      } else {
        // Force update password to 'admin123' to fix lockout issues due to secret changes
        await updateUser(adminEmail, { passwordHash: hashPassword("admin123") });
        if (process.env.NODE_ENV === "development") {
          console.log(`Admin password synced for ${adminEmail} (dev default). Change in production.`);
        }
      }
    } catch (e) {
      console.error("Admin setup failed:", e);
    }
  }

  return { getUser, registerUser, login, getSession, logout, setupDefaultAdmin, updateUser };
}

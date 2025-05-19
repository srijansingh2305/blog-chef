/**
 * Session management configuration for BlogChef backend.
 * Uses Redis store in production and in-memory store in development.
 * Configures session cookie properties and secret.
 */

import session from "express-session";
import connectRedis from "connect-redis";
import memoryStore from "memorystore";
import redisClient from "../cache/index.js";

const RedisStore = connectRedis(session);
const MemoryStore = memoryStore(session);

/**
 * Returns configured session middleware.
 * @param {Object} app - Express app instance.
 * @returns {Function} Session middleware.
 */
export default app => session({
    // Use Redis store in production, memory store otherwise
    store: app.get("env") === "production" 
        ? new RedisStore({client: redisClient}) 
        : new MemoryStore(),
    name: 'sessId', // Session cookie name
    secret: process.env.sessionSecret, // Secret for signing session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: {
      secure: app.get('env') === 'production' ? true : false, // Secure cookie in production
      httpOnly: true, // Prevent client-side JS access to cookie
      maxAge: 18000000, // Cookie expiration time (5 hours)
    },
  });

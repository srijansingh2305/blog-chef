/**
 * Middleware to protect routes by checking if user is authenticated via session.
 * Redirects to specified path if not authenticated.
 * Also exports CSRF protection middleware.
 */

import { verifyUser } from '../controllers/user.js';
import csurf from "csurf";

/**
 * Returns middleware that protects routes by verifying user session.
 * @param {String} redirectTo - Path to redirect if not authenticated.
 * @returns {Function} Express middleware function.
 */
const protectRoute =
  (redirectTo = '/') =>
  async (req, res, next) => {
    try {
      // Check if user session exists and user is valid
      if (req.session.user && (await verifyUser(req.session.user.email))) {
        return next();
      }

      // Redirect if not authenticated
      res.redirect(redirectTo);
    } catch {
      // Redirect on error
      res.redirect(redirectTo);
    }
  };

// CSRF protection middleware
export const csrfProtection = csurf();
export default protectRoute;

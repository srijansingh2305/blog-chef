/**
 * Middleware to protect API routes by verifying JWT token in Authorization header.
 * Returns 403 Unauthorized if token is missing or invalid.
 */

import { verifyToken } from '../controllers/user.js';

/**
 * Express middleware function to protect API routes.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
const protectApi = async (req, res, next) => {
  try {
    let authorization = req.header('Authorization');
    if (authorization) {
      // Extract token from "Bearer <token>" format
      const token = authorization.split(' ')[1];
      // Verify token validity
      await verifyToken(token);
      return next();
    }

    // If no authorization header, respond with 403
    res.status(403).json({ message: 'Unauthorized access' });
  } catch (error) {
    // If verification fails, respond with 403
    res.status(403).json({ message: 'Unauthorized access' });
  }
};

export default protectApi;

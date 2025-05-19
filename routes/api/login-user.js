/**
 * API route handler for user login.
 * Authenticates user and returns user data and JWT token.
 */

import { loginUser } from '../../controllers/user.js';

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;
    // Authenticate user and get user data and token
    const { user, token } = await loginUser({ email, password });
    // Send user and token as JSON response
    res.json({ user, token });
  } catch (error) {
    // Send 403 status with error if authentication fails
    res.status(403).json(error);
  }
};

/**
 * API route handler for user signup.
 * Registers new user and returns user data and JWT token.
 */

import { signUpUser } from '../../controllers/user.js';

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default async (req, res) => {
  try {
    // Extract name, email, and password from request body
    const { name, email, password } = req.body;
    // Register new user and get user data and token
    const { user, token } = await signUpUser({ name, email, password });
    // Send user and token as JSON response
    res.json({ user, token });
  } catch (error) {
    // Send 403 status with error if registration fails
    res.status(403).json(error);
  }
};

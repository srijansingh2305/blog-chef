/**
 * Admin login route handler.
 * Authenticates admin user and sets session, redirects accordingly.
 */

import { loginAdmin } from '../../controllers/user.js';

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;
    // Authenticate admin user
    let user = await loginAdmin({ email, password });
    // Set user session with relevant info
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      lastLoggedIn: user.lastLoggedIn,
    };
    // Redirect to admin dashboard on success
    return res.redirect('/admin/dashboard');
  } catch {
    // Redirect back to login on failure
    res.redirect('/admin/login');
  }
};

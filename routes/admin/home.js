/**
 * Admin home route handler.
 * Redirects authenticated users to dashboard, others to login.
 */

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default (req, res) => {
  // If user session exists, redirect to admin dashboard
  if (req.session.user) {
    return res.redirect("/admin/dashboard");
  }

  // Otherwise, redirect to admin login page
  res.redirect("/admin/login");
};

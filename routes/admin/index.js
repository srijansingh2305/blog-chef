
import { Router } from 'express';
import protectRoute, {csrfProtection} from '../../utils/protectRoute.js';
import home from './home.js';
import login from './login.js';
import dashboard from './dashboard.js';
import logOut from './logout.js';
import moderatePost from './moderate-post.js';
import signUpAdmin from './signup-admin.js';
import { loginAdminvalidation, signUpAdminValidation } from '../../utils/validation.js';

const router = Router();

/**
 * GET /
 * Admin home route.
 * Uses the 'home' controller to render the admin home page.
 */
router.get('/', home);

/**
 * Route: /login
 * GET: Renders the login page with CSRF token.
 * POST: Handles login form submission with CSRF protection and validation middleware.
 * Uses 'login' controller to authenticate admin user.
 */
router
  .route('/login')
  .get(csrfProtection, (req, res) => res.render('login', {csrfToken: req.csrfToken()}))
  .post(csrfProtection, loginAdminvalidation, login);

/**
 * Route: /signup
 * GET: Renders the signup page with CSRF token.
 * POST: Handles signup form submission with CSRF protection and validation middleware.
 * Uses 'signUpAdmin' controller to register a new admin user.
 */
router
  .route('/signup')
  .get(csrfProtection, (req, res) => res.render('signup', {csrfToken: req.csrfToken()}))
  .post(csrfProtection, signUpAdminValidation, signUpAdmin);

/**
 * GET /dashboard
 * Protected route that renders the admin dashboard.
 * Uses 'protectRoute' middleware to ensure only authenticated admins can access.
 * Also uses CSRF protection.
 * Uses 'dashboard' controller to render dashboard data.
 */
router.get('/dashboard', protectRoute('/admin/login'), csrfProtection, dashboard);

/**
 * GET /logout
 * Logs out the admin user.
 * Uses 'logOut' controller to clear session and redirect.
 */
router.get('/logout', logOut);

/**
 * POST /moderate
 * Handles post moderation actions.
 * Uses CSRF protection.
 * Uses 'moderatePost' controller to approve or reject posts.
 */
router.post('/moderate', csrfProtection,  moderatePost);

export default router;

/**
 * Explanation of functions and components:
 * - home: Controller that renders the admin home page.
 * - login: Controller that handles admin login authentication.
 * - signUpAdmin: Controller that handles admin user registration.
 * - dashboard: Controller that renders the admin dashboard with relevant data.
 * - logOut: Controller that logs out the admin by clearing session.
 * - moderatePost: Controller that processes post moderation actions (approve/reject).
 * - protectRoute: Middleware that protects routes by checking admin authentication.
 * - csrfProtection: Middleware that provides CSRF token protection for forms.
 * - loginAdminvalidation, signUpAdminValidation: Middleware functions that validate login and signup form inputs.
 */

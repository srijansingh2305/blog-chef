/**
 * Admin dashboard route handler.
 * Fetches flagged posts and renders the dashboard view with user info and CSRF token.
 */

import moment from 'moment';
import { getFlaggedPosts } from '../../controllers/post.js';

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default async (req, res) => {
  try {
    // Fetch posts flagged for moderation
    const getPosts = await getFlaggedPosts();
    // Render dashboard view with user info, last login formatted, posts, and CSRF token
    res.render('dashboard', {
      user: req.session.user.name,
      lastLoggedIn: moment(req.session.user.lastLoggedIn).format('MMMM Do YYYY, h:mm:ss a'),
      posts: getPosts,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    // Send error message if rendering fails
    res.send('There was an error rendering the page!');
  }
};

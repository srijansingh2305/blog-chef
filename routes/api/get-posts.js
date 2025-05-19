/**
 * API route handler to get all approved posts.
 * Fetches posts from database and caches the result.
 */

import { getAllPosts } from '../../controllers/post.js';
import { cacheContent } from '../../controllers/cache.js';

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default async (req, res) => {
  try {
    // Fetch all approved posts from DB
    const posts = await getAllPosts();
    // Cache the posts for faster future retrieval
    cacheContent('all-posts', posts);
    // Send posts as JSON response
    res.json({ posts });
  } catch (error) {
    // Send 404 status with error if fetching fails
    res.status(404).json(error);
  }
};

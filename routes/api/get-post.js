/**
 * API route handler to get a single post by ID.
 * Fetches post from database and caches the result.
 */

import { getPost } from '../../controllers/post.js';
import { cacheContent } from '../../controllers/cache.js';

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default async (req, res) => {
  try {
    // Extract post ID from route parameters
    const id = req.params.postId;
    // Fetch post from DB by ID
    const post = await getPost(id);
    // Cache the post for faster future retrieval
    cacheContent(`post:${id}`, post);
    // Send post as JSON response
    res.json({ post });
  } catch (error) {
    // Send 404 status with error if fetching fails
    res.status(404).json(error);
  }
};

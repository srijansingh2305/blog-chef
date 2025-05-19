/**
 * API route handler to create a new post.
 * Creates post in database and clears cached posts.
 */

import { createPost } from '../../controllers/post.js';
import { deleteCache } from '../../controllers/cache.js';

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default async (req, res) => {
  try {
    // Create a new post with data from request body
    const post = await createPost(req.body.post);
    // Clear cached posts to reflect new post
    deleteCache('all-posts');
    // Send created post as JSON response
    res.json({ post });
  } catch (error) {
    // Send 401 status with error if creation fails
    res.status(401).json({ error });
  }
};

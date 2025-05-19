/**
 * API route handler to delete a post by ID.
 * Deletes post from database and clears related cache.
 */

import { deletePost } from '../../controllers/post.js';
import { deleteCache } from '../../controllers/cache.js';

/**
 * Express route handler function.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export default async (req, res) => {
  try {
    // Extract post ID from route parameters
    const postId = req.params.postId;
    // Delete post from DB by ID
    await deletePost(postId);
    // Clear cached post and all posts cache
    deleteCache([`post:${postId}`, 'all-posts']);
    // Send success status as JSON response
    res.json({ status: true });
  } catch (error) {
    // Send 401 status with error if deletion fails
    res.status(401).json({ error });
  }
};

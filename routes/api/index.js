/**
 * API routes setup for BlogChef backend.
 * Defines routes for posts, user authentication, and verification.
 * Applies middleware for caching, validation, and protection.
 */

import { Router } from 'express';
import getPosts from './get-posts.js';
import storePost from './store-post.js';
import loginUser from './login-user.js';
import signUpUser from './signup-user.js';
import getPost from './get-post.js';
import deletePost from './delete-post.js';
import catchAll from './catch-all.js';
import protectApi from '../../utils/protectApi.js';
import verify from './verify.js';
import { servePostsFromCache, servePostFromCache } from '../../controllers/cache.js';
import { storePostValidation, loginUserValidation, signUpUserValidation, jwtValidation } from '../../utils/validation.js';

const router = Router();

/**
 * GET /posts
 * Serves cached posts if available, then fetches approved posts.
 */
router.get('/posts', servePostsFromCache(), getPosts);

/**
 * Route: /post/:postId?
 * GET: Serves cached post if available, then fetches a single post.
 * POST: Protected route to create a new post with validation.
 * DELETE: Protected route to delete a post.
 */
router.route('/post/:postId?')
  .get(servePostFromCache(), getPost)
  .post(protectApi, storePostValidation, storePost)
  .delete(protectApi, deletePost);

/**
 * POST /login
 * Validates and authenticates user login.
 */
router.post('/login', loginUserValidation, loginUser);

/**
 * POST /signup
 * Validates and registers a new user.
 */
router.post('/signup', signUpUserValidation, signUpUser);

/**
 * POST /verify
 * Validates JWT token for user verification.
 */
router.post('/verify', jwtValidation, verify);

/**
 * Catch-all route for undefined API endpoints.
 */
router.use(catchAll);

export default router;

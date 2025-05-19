/**
 * Controller for Post-related database operations.
 * Uses Mongoose Post model to interact with MongoDB.
 */

import Post from '../models/post.js';

/**
 * Fetch all approved posts with user details populated.
 * @returns {Promise} List of approved posts.
 */
export const getAllPosts = () => Post.find({ isApproved: true }).populate('user', 'name _id');

/**
 * Fetch a single post by ID with user details populated.
 * @param {String} id - Post ID.
 * @returns {Promise} Post document.
 */
export const getPost = (id) => Post.findById(id).populate('user', 'name _id');

/**
 * Create a new post document.
 * @param {Object} param0 - Post data including title, content, and user reference.
 * @returns {Promise} Created post document.
 */
export const createPost = ({ title, content, user }) => Post.create({ title, content, user });

/**
 * Delete a post by ID.
 * @param {String} id - Post ID.
 * @returns {Promise} Result of deletion.
 */
export const deletePost = (id) => Post.findByIdAndDelete(id);

/**
 * Fetch posts that are flagged (not approved).
 * @returns {Promise} List of flagged posts.
 */
export const getFlaggedPosts = () => Post.find({ isApproved: false }).populate('user', 'name _id');

/**
 * Approve a flagged post by setting isApproved to true.
 * @param {String} id - Post ID.
 * @returns {Promise} Updated post document.
 */
export const approvePost = (id) => Post.findByIdAndUpdate(id, { isApproved: true });

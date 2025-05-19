/**
 * Mongoose schema and model for blog posts.
 * Includes fields for title, content, user reference, creation date, and approval status.
 * Applies profanity filtering before validation to flag posts.
 */

import { Schema, model } from 'mongoose';
const { ObjectId } = Schema.Types;
import profanityFilter from '../utils/profanityFilter.js';

// Define the Post schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isApproved: {
    type: Boolean,
    default: true,
  },
});

// Pre-validation hook to check for profanity in content
postSchema.pre('validate', function (next) {
  // If content is not modified, skip
  if (!this.isModified('content')) return next();

  // If profanity detected, mark post as not approved
  if (profanityFilter(this.content)) {
    this.isApproved = false;
    next();
  } else {
    next();
  }
});

// Create the Post model
const Post = model('Post', postSchema);

export default Post;

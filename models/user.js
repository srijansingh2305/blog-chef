/**
 * Mongoose schema and model for users.
 * Includes fields for name, email, password, timestamps, and admin flag.
 * Passwords are hashed before saving.
 * Provides methods for password checking and updating last login timestamp.
 */

import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  lastLoggedIn: { type: Date, default: Date.now },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Pre-save hook to hash password if modified
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

/**
 * Method to check if a given password matches the stored hashed password.
 * @param {String} password - Plain text password to check.
 * @returns {Promise} Resolves if password matches, rejects otherwise.
 */
userSchema.methods.checkPassword = async function (password) {
  const match = await bcryptjs.compare(password, this.password);
  if (match) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};

/**
 * Method to update the lastLoggedIn timestamp to current date.
 * @returns {Promise} Mongoose update query promise.
 */
userSchema.methods.updateLoggedIn = function () {
  return this.model('User').findOneAndUpdate({ email: this.email }, { lastLoggedIn: new Date() });
};

// Create the User model
const User = model('User', userSchema);

export default User;

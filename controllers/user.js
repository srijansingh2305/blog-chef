/**
 * Controller for User-related operations including authentication and authorization.
 * Uses Mongoose User model and JSON Web Tokens (JWT) for security.
 */

import User from '../models/user.js';
import jwt from 'jsonwebtoken';

/**
 * Signs a JWT token with the given payload object.
 * @param {Object} obj - Payload to sign.
 * @returns {Promise} Resolves with signed token.
 */
const sign = (obj) =>
  new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.jwtPrivateKey, (error, token) => {
      if (error) return reject(error);

      return resolve(token);
    });
  });

/**
 * Verifies a JWT token.
 * @param {String} token - JWT token to verify.
 * @returns {Promise} Resolves if token is valid.
 */
const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, (error) => {
      if (error) return reject();
      return resolve({ success: true });
    });
  });

/**
 * Registers a new admin user.
 * @param {Object} param0 - Admin user details.
 * @returns {Promise} Resolves on success.
 */
export const signUpAdmin = async ({ name, email, password }) => {
  try {
    await User.create({ name, email, password, isAdmin: true });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
};

/**
 * Logs in an admin user by verifying credentials.
 * @param {Object} param0 - Admin login details.
 * @returns {Promise} Resolves with user on success.
 */
export const loginAdmin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email, isAdmin: true });
    await user.checkPassword(password);
    await user.updateLoggedIn();
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Registers a new regular user and returns a JWT token.
 * @param {Object} param0 - User details.
 * @returns {Promise} Resolves with user info and token.
 */
export const signUpUser = async ({ name, email, password }) => {
  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = await sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    return Promise.resolve({
      user: { id: user._id, name: user.name, lastLoggedIn: user.lastLoggedIn },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

/**
 * Logs in a regular user by verifying credentials and returns a JWT token.
 * @param {Object} param0 - User login details.
 * @returns {Promise} Resolves with user info and token.
 */
export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      email,
    });
    await user.checkPassword(password);
    await user.updateLoggedIn();
    const token = await sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    return Promise.resolve({
      user: { id: user._id, name: user.name, lastLoggedIn: user.lastLoggedIn },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

/**
 * Verifies a JWT token and checks if the user exists.
 * @param {String} token - JWT token.
 * @returns {Promise} Resolves if token is valid and user exists.
 */
export const verifyToken = async (token) => {
  try {
    const user = jwt.decode(token);

    const findUser = await User.findOne({ email: user.email });
    if (!findUser) {
      return Promise.reject({ error: 'Unauthorized' });
    }
    await verify(token);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error: 'Unauthorized' });
  }
};

/**
 * Checks if a user exists by email.
 * @param {String} email - User email.
 * @returns {Promise} Resolves true if user exists, false otherwise.
 */
export const verifyUser = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      return resolve(user ? true : false);
    } catch {
      return reject(false);
    }
  });

/**
 * Database connection module.
 * Uses Mongoose to connect to MongoDB Atlas.
 */

import mongoose from "mongoose";

/**
 * Connects to MongoDB Atlas using credentials from environment variables.
 * @returns {Promise} Mongoose connection promise.
 */
const connectToDb = () =>
  mongoose.connect(
    `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@blog-chef.agghuk1.mongodb.net/blogchef?retryWrites=true&w=majority&appName=Blog-chef`
  );

export default connectToDb;

/**
 * Main backend application entry point for BlogChef.
 * Sets up Express server with middleware, routes, database connection, and starts listening.
 */

import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import morgan from 'morgan';
import session from './session/index.js';
import compression from 'compression';
import home from './routes/home/index.js';
import admin from './routes/admin/index.js';
import api from './routes/api/index.js';
import connectToDb from './db/index.js';
import helmet from "helmet";

const app = express();

// Determine __dirname for ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));
const logFile = join(__dirname, 'blogchef.log');
const PORT = proecess.env.PORT || 3000;

// Security middleware to set HTTP headers
app.use(helmet());

// Compress response bodies for all requests
app.use(compression());

// Serve static assets from public directory
app.use('/assets', express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'public', 'client')));

// Parse URL-encoded bodies and JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("trust proxy", 1)

// Session management middleware for /admin routes
app.use(
  '/admin',
  session(app)
);

// HTTP request logging to console
app.use(morgan(':method - :url - :date - :response-time ms'));

// HTTP request logging to file
app.use(
  morgan(':method - :url - :date - :response-time ms', {
    stream: createWriteStream(logFile, { flags: 'a' }),
  })
);

// Set Pug as the view engine for server-side rendering
app.set('view engine', 'pug');

// Mount route handlers
app.use('/admin', admin);
app.use('/api', api);
app.use('/', home);

// Connect to MongoDB and start server
Promise.all([connectToDb()])
  .then(() => app.listen(PORT, () => console.log(`Blog Chef is cooking on port ${PORT}`)))
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });

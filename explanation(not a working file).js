// ✅ Core framework to build server and define routes
import express from 'express';

// ✅ Used for parsing URL-encoded strings (not actively used in this file but imported)
import { parse } from 'querystring';

// ✅ Utility to get file path info in ES modules (to simulate __dirname)
import { fileURLToPath } from 'url'; 
import { join, dirname } from 'path'; 

// ✅ Node.js stream to write logs into a file
import { createWriteStream } from 'fs';

// ✅ Express session middleware for storing login sessions
import session from "express-session";

// ✅ Logging middleware to log HTTP requests
import morgan from 'morgan';

// ✅ Middleware to compress HTTP responses (improves performance)
import compression from 'compression';

// ✅ Custom middleware to protect authenticated routes
import protectedRoute from './utils/protectRoute.js';

// ✅ Resolving __dirname (not available in ES modules by default)
const __dirname = dirname(fileURLToPath(import.meta.url)); 

// ✅ Initialize the Express app
const app = express(); 

// ✅ Path to log file for request logs
const logFile = join(__dirname, "blogchef.log");


// --------------------- MIDDLEWARE ---------------------

// ✅ Compresses all HTTP responses (gzip) to improve performance
app.use(compression());

// ✅ Log requests to console
app.use(morgan(":method - :url - :date - :response-time ms"));

// ✅ Log requests to file in append mode
app.use(morgan(":method - :url - :date - :response-time ms", {
  stream: createWriteStream(logFile, { flags: "a" }),
}));

// ✅ Serve static assets (CSS, JS, images) from /public via /assets route
app.use("/assets", express.static(join(__dirname, "public")));

// ✅ Parse `application/x-www-form-urlencoded` data (from forms)
app.use(express.urlencoded({ extended: false }));

// ✅ Parse JSON payloads (API, AJAX requests)
app.use(express.json());

// ✅ Setup session for /admin routes to handle login sessions
app.use("/admin", session({
  name: "sessId", // Custom name for the session cookie
  resave: false, // Don't save session if nothing has changed
  saveUninitialialized: true, // Save empty sessions
  secret:
    app.get("env") === "production" 
      ? process.env.sessionSecret 
      : "2bb375d5ab358776bbf28695", // Secure secret in production
  cookie: {
    httpOnly: true,       // Prevent client-side JS access
    maxAge: 18000000,     // 5 hours session
    secure: app.get("env") === "production" // HTTPS-only in prod
  }
}));

// ✅ Set Pug as the template engine for rendering HTML views
app.set("view engine", "pug");


// --------------------- ROUTES ---------------------

// ✅ Basic home route (GET /) - responds with a simple welcome message
app.get("/", (req, res) => {
    res.status(200).send("<h1>Blog chef says hello!</h1>");
});


// ✅ GET /admin - Redirects user based on login session
// If logged in: goes to dashboard; else redirects to login page
app.get("/admin", (req, res) => {
    req.session.user 
        ? res.redirect("/admin/dashboard") 
        : res.redirect("/admin/login");
});

// ✅ GET /admin/login - Render the login form (Pug view: login.pug)
app.get("/admin/login", (req, res) =>
    res.render("login")
);

// ✅ POST /admin/login - Handles login form submission
app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;

    // Dummy login check (replace with DB in real-world)
    if (email === "srijansingh235@gmail.com" && password === "12345") {
        req.session.user = "Srijan Singh"; // Store user in session
        return res.redirect("/admin/dashboard");
    }

    // Failed login – redirect back
    res.redirect("/admin/login");
});

// ✅ GET /admin/dashboard - Protected route (only accessible if logged in)
// Renders dashboard with a list of posts
app.get("/admin/dashboard", protectedRoute("/admin/login"), (req, res) => {
    res.render("dashboard", {
        user: req.session.user,
        posts: [
            {
                id: 3,
                author: "Sarah L",
                title: "Node.js rocks!",
                content: "I've been using Node.js for backend development and it's blazing fast!"
            },
            {
                id: 4,
                author: "Daniel K",
                title: "Middleware in Express",
                content: "Middleware functions in Express simplify request handling a lot."
            },
            {
                id: 5,
                author: "Rita B",
                title: "Exploring Templating Engines",
                content: "I explored EJS and Handlebars along with Pug. Each has its strengths."
            },
            {
                id: 6,
                author: "Alex T",
                title: "REST API with Express",
                content: "Building RESTful APIs with Express is intuitive and powerful."
            },
            {
                id: 7,
                author: "Nina G",
                title: "Debugging Express Apps",
                content: "Using morgan and nodemon helped me debug my Express apps faster."
            }
        ]
    });
});

// ✅ POST /admin/approve - Placeholder route to "approve" posts
// Just redirects back to dashboard
app.post("/admin/approve", (req, res) => {
    res.redirect("/admin/dashboard");
});

// ✅ GET /admin/logout - Destroys the user session and redirects to login
app.get("/admin/logout", (req, res) => {
    delete req.session.user;
    res.redirect("/admin/login");
});

// ✅ POST /api/posts - Example API endpoint that logs request body
app.post("/api/posts", (req, res) => {
    console.log(req.body);
    res.json({ message: "Got it" });
});


// --------------------- SERVER START ---------------------

// ✅ Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// ✅ Export the app for testing or external use
export default app;

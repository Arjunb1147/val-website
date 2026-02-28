// ============================================================
// SERVER.JS — The main entry point for our backend server.
// Think of this as the "reception desk" of our application.
// It starts the server, sets up rules for incoming requests,
// and connects to our API routes (where the actual data lives).
// ============================================================

// "express" is a popular framework that makes it easy to build web servers in Node.js.
// Without it, we'd have to write hundreds of lines of low-level networking code.
const express = require("express");

// "cors" (Cross-Origin Resource Sharing) allows our frontend (running on port 3000)
// to talk to our backend (running on port 5001). Without this, the browser would
// block the frontend from fetching data from a different port for security reasons.
const cors = require("cors");

// "path" is a built-in Node.js module for working with file paths.
// We use it to locate the built frontend files (in the "frontend/dist" folder).
const path = require("path");

// This imports our API routes file, which contains all the VAL data
// (pillars, team members, courses, etc.) and the endpoints to access them.
const apiRoutes = require("./routes/api");

// Create the Express application — this is our actual server instance.
const app = express();

// The port number our server will listen on.
// It checks if a port was set in the environment (useful for deployment),
// otherwise defaults to 5001. (Port 5000 is used by macOS AirPlay.)
const PORT = process.env.PORT || 5001;

// Enable CORS so the frontend can communicate with this backend.
app.use(cors());

// This tells Express to understand JSON data sent in request bodies.
// For example, if someone submits a contact form, the data arrives as JSON.
app.use(express.json());

// Mount all our API routes under the "/api" path.
// So when someone visits "/api/pillars", Express will look in the apiRoutes
// file to figure out what data to send back.
app.use("/api", apiRoutes);

// ============================================================
// SERVE THE BUILT FRONTEND (Production Mode)
//
// In production (on Render.com), the backend serves BOTH:
//   1. The API endpoints (above) — e.g., /api/pillars, /api/leads
//   2. The React website files — HTML, CSS, JavaScript, images
//
// During local development, you run the frontend separately with
// "npm run dev" in the frontend folder (Vite dev server on port 3000).
// But in production, there's no Vite — the backend serves everything.
//
// HOW IT WORKS:
// "express.static" tells Express: "If someone requests a file like
//  /images/HomeBanner.jpeg, look for it in the frontend/dist folder."
//
// The "catch-all" route below handles everything else:
// If someone visits "/" or any page that isn't an API route or a file,
// serve the React app's index.html. React then handles the page
// rendering on the client side.
// ============================================================
const frontendPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendPath));

// Catch-all: any request that didn't match an API route or a static file
// gets the React app's index.html. This is needed so that if someone
// visits the site directly (e.g., bookmarks the URL), they get the
// React app instead of a "404 Not Found" error.
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start the server and begin listening for incoming requests.
// Once started, it prints the URL to the console so you know where to access it.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

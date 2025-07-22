const path = require("path"); // Import Node.js 'path' module for handling file paths
const express = require("express"); // Import Express framework for building web applications
const cors = require("cors"); // Import CORS middleware to enable Cross-Origin Resource Sharing
const morgan = require("morgan"); // Import Morgan middleware for logging HTTP requests

const planetsRouter = require("./routes/planets/planets.router"); // Import router for '/planets' API endpoints
const launchesRouter = require("./routes/launches/launches.router"); // Import router for '/launches' API endpoints

const app = express(); // Create an Express application instance

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests only from this origin (frontend)
  })
);

app.use(morgan("combined")); // Use Morgan to log HTTP requests in 'combined' format
app.use(express.json()); // Parse incoming JSON requests and put the parsed data in req.body
app.use(express.static(path.join(__dirname, "..", "public"))); // Serve static files from the 'public' directory

app.use("/planets", planetsRouter); // Mount planetsRouter for all '/planets' routes
app.use("/launches", launchesRouter); // Mount launchesRouter for all '/launches' routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html")); // Serve 'index.html' for the root route
});

module.exports = app; // Export the Express app instance for use in other files

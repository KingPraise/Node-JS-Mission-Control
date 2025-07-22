const http = require("http"); // Import Node.js HTTP module to create a server
const app = require("./app"); // Import the Express app configuration
const { loadPlanetsData } = require("./models/planets.model"); // Import function to load planets data from CSV
const PORT = process.env.PORT || 8000; // Set the server port from environment or default to 8000
const server = http.createServer(app); // Create an HTTP server using the Express app

// Define an async function to start the server
async function startServer() {
  // Wait for the planets data to be loaded before starting the server
  await loadPlanetsData()
    // If data loads successfully, log a confirmation message
    .then(() => {
      console.log("Planets data loaded successfully.");
    })
    // If there is an error loading data, log the error
    .catch((error) => {
      console.error("Error loading planets data:", error);
    });
  // Start the HTTP server and listen on the specified port
  server.listen(PORT, () => {
    // Log a message indicating the server is running and on which port
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer(); // Call the function to start the server

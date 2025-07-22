const express = require("express"); // Import the Express framework
const {
  httpGetAllLaunches,              // Import controller function to get all launches
  httpAddNewLaunch,                // Import controller function to add a new launch
  httpAbortLaunch,                 // Import controller function to abort a launch
} = require("./launches.controller");

const launchesRouter = express.Router(); // Create a new router instance for launches

launchesRouter.get("/", httpGetAllLaunches);      // Define GET route for '/' to fetch all launches
launchesRouter.post("/", httpAddNewLaunch);       // Define POST route for '/' to add a new launch
launchesRouter.delete('/:id', httpAbortLaunch);   // Define DELETE route for '/:id' to abort a specific launch

module.exports = launchesRouter; // Export the router to be used in other parts of the app

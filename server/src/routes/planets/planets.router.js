const express = require("express"); // Import the Express framework

const { httpGetAllPlanets } = require("./planets.controller"); // Import the controller function for getting all planets

const planetsRouter = express.Router(); // Create a new router instance for planets

planetsRouter.get("/", httpGetAllPlanets); // Define a GET route for '/' that uses the httpGetAllPlanets controller

module.exports = planetsRouter; // Export the planets router for use in other files

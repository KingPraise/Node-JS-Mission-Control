const { getAllPlanets } = require('../../models/planets.model'); // Import the getAllPlanets function from the planets model


// Define the controller function to handle GET requests for all planets
function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets()); // Respond with status 200 and the list of all habitable planets as JSON
}

module.exports = { httpGetAllPlanets }; // Export the controller function for use in the

const fs = require("fs"); // Import Node.js file system module for reading files
const path = require("path"); // Import Node.js path module for handling file paths
const { parse } = require("csv-parse"); // Import csv-parse library for parsing CSV files

const habitablePlanets = []; // Array to store planets that meet habitability criteria

// Function to check if a planet is habitable based on specific criteria
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" && // Only confirmed planets
    planet["koi_insol"] > 0.36 &&                // Insolation (energy received) is above lower bound
    planet["koi_insol"] < 1.11 &&                // Insolation is below upper bound
    planet["koi_prad"] < 1.6                     // Planet radius is less than 1.6 Earth radii
  );
}

// Function to load planet data from CSV file and filter habitable planets
function loadPlanetsData() {
  return new Promise((resolve, reject) => { // Return a promise for async operation
    fs.createReadStream( // Create a readable stream from the CSV file
      path.join(__dirname, "..", "..", "data", "kepler_data.csv") // Build the file path
    )
      .pipe( // Pipe the file stream into the CSV parser
        parse({
          comment: "#",   // Ignore lines starting with '#'
          columns: true,  // Treat first row as column headers
        })
      )
      .on("data", async (data) => { // For each row of data parsed
        if (isHabitablePlanet(data)) { // Check if the planet is habitable
          habitablePlanets.push(data); // If yes, add to the array
        }
      })
      .on("error", (err) => { // Handle errors during parsing
        console.log(err);     // Log the error
        reject(err);          // Reject the promise
      })
      .on("end", async () => { // When parsing is finished
        console.log(`${habitablePlanets.length} habitable planets found!`); // Log the count
        resolve(); // Resolve the promise
      });
  });
}

// Function to get all habitable planets found
function getAllPlanets() {
  return habitablePlanets; // Return the array of habitable planets
}

// Export the functions for use in other files
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};

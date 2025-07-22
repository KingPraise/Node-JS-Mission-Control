const launches = new Map(); // Create a Map to store launch data, using flight numbers as keys

let latestFlightNumber = 100; // Track the latest flight number assigned

const launch = { // Define an initial launch object with details
  flightNumber: 100, // Unique identifier for the launch
  mission: "Kepler Exploration X", // Mission name
  rocket: "Explorer IS1", // Rocket name/type
  launchDate: new Date("December 27, 2030"), // Scheduled launch date
  target: "Kepler-442 b", // Target destination
  customer: ["ZTM", "NASA"], // Customers for the launch
  upcoming: true, // Indicates if the launch is upcoming
  success: true, // Indicates if the launch is successful
};

launches.set(launch.flightNumber, launch); // Add the initial launch to the launches Map

function existsLaunchWithId(launchId) { // Check if a launch exists for a given flight number
  return launches.has(launchId); // Return true if the launch exists, false otherwise
}

function getAllLaunches() { // Retrieve all launches from the Map
  return Array.from(launches.values()); // Convert Map values to an array and return
}

function addNewLaunch(launch) { // Add a new launch to the Map
  latestFlightNumber++; // Increment the flight number for the new launch
  launches.set(
    latestFlightNumber, // Use the new flight number as the key
    Object.assign(launch, { // Merge provided launch data with default properties
      success: true, // Set launch as successful by default
      upcoming: true, // Set launch as upcoming by default
      customers: ["Zero to Mastery", "NASA"], // Default customers for the launch
      flightNumber: latestFlightNumber, // Assign the new flight number
    })
  );
}

function abortLaunchById(launchId) { // Abort a launch by its flight number
  const launch = launches.get(launchId); // Retrieve the launch from the Map
  if (!launch) { // If launch doesn't exist
    return { ok: false }; // Indicate failure to abort
  }
  launch.upcoming = false; // Mark launch as no longer upcoming
  launch.success = false; // Mark launch as unsuccessful
  return { ok: true }; // Indicate successful abort
}

module.exports = { // Export functions for use in other files
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};

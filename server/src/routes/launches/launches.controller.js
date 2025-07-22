const {
  getAllLaunches,        // Import function to get all launches
  addNewLaunch,          // Import function to add a new launch
  existsLaunchWithId,    // Import function to check if a launch exists by ID
  abortLaunchById,       // Import function to abort a launch by ID
} = require("../../models/launches.model"); // Import these functions from the launches model

function httpGetAllLaunches(req, res) {
  // Handle HTTP GET request for all launches
  // Respond with status 200 and JSON of all launches
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body; // Get launch data from request body

  launch.launchDate = new Date(launch.launchDate); // Convert launchDate to a Date object

  // Check if any required property is missing
  if (
    !launch.mission ||      // Mission name missing
    !launch.rocket ||       // Rocket name missing
    !launch.launchDate ||   // Launch date missing
    !launch.target          // Target missing
  ) {
    // Respond with status 400 and error message
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  // Check if launchDate is invalid
  if (isNaN(launch.launchDate)) {
    // Respond with status 400 and error message
    return res.status(400).json({
      error: "Invalid launch Date",
    });
  }

  addNewLaunch(launch); // Add the new launch to the data store

  // Respond with status 201 and the launch data
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id); // Get launch ID from request parameters and convert to number

  // Check if launch with given ID exists
  if (!existsLaunchWithId(launchId)) {
    // Respond with status 404 and error message
    return res.status(404).json({
      error: "Launch not Found",
    });
  }

  const aborted = abortLaunchById(launchId); // Abort the launch and get result

  // Respond with status 200 and result of abort operation
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches, // Export GET handler
  httpAddNewLaunch,   // Export POST handler
  httpAbortLaunch,    // Export DELETE/abort handler
};

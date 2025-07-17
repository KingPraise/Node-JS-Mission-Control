const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData()
    .then(() => {
      console.log("Planets data loaded successfully.");
    })
    .catch((error) => {
      console.error("Error loading planets data:", error);
    });
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();

// In-memory database - no connection needed
// Data is stored in JavaScript memory

async function connectToMongo() {
  // Fake connection - just log that we're using in-memory storage
  console.log("Using in-memory database (no MongoDB connection needed)");
  return Promise.resolve();
}

module.exports = { connectToMongo };

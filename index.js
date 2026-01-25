const http = require("http");

const { createApp } = require("./src/app");
const { connectToMongo } = require("./src/db");

async function main() {
  const app = createApp();

  const PORT = process.env.PORT || 3000;

  await connectToMongo();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});

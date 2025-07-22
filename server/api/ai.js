const express = require("express");
require("dotenv/config");

const aiRoutes = require("../src/routes/ai.routes");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);

if (process.env.NODE_ENV !== "production") {
  let PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log("Server is running on PORT : ", PORT);
  });
}

// // Export the serverless handler for Vercel
// module.exports = serverless(app);

module.exports = app; // Export the Express app for Vercel

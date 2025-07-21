let express = require("express");
require("dotenv/config");
let aiRoutes = require("./src/routes/ai.routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);

if (process.env.NODE_ENV !== "production") {
  let PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log("Server is running on PORT : ", PORT);
  });
}

module.exports = app;
// For production, the server will be started by the process manager or cloud service.

let express = require("express");
require("dotenv/config");
let aiRoutes = require("./src/routes/ai.routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on PORT : ", PORT);
});

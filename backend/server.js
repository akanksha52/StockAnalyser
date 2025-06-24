const express = require("express");
const app = express();
const stockRoutes = require("./routes/stockRoutes");
const cors = require("cors");
app.use(cors());

app.use("/stocks", stockRoutes);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));

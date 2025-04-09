const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const jobRoutes = require(path.resolve(__dirname, "./routes/JobRoutes"));

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


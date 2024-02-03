require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.get("/", (req, res) => {
      const status = {
        Status: "Running",
      };
      return res.send(status);
    });
    app.use("/api/todos", todoRoutes);

    app.listen(PORT, () => {
      console.log(
        `Server is running on ${process.env.PROTOCOL}://${process.env.SERVER_IP}:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

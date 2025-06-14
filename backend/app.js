const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const UserAPI = require("./router/user");
const TaskAPI = require("./router/task");

const app = express();

app.use(cors({
  origin: "https://task-manage-mern.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);

app.use("/", (req, res) => {
  res.send("Hello from the backend!");
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

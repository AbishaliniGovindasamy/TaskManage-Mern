import path from "path";
const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const UserAPI = require("./router/user");
const TaskAPI = require("./router/task");

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);

if (process.env.REACT_APP_AUTH_TOKEN === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

app.use("/", (req, res) => {
    res.send("hello from backend side");
});



//localhost:1000/api/v1/sign-in


const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

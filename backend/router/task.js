const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("../router/auth"); // Correct import

// Create Task Route
router.post("/create-task", authenticateToken, async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;

        const newTask = new Task({ title, desc });
        const savedTask = await newTask.save();
        const taskId = savedTask._id;

        await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
        res.status(200).json({ message: "Task Created"});
    } catch (error) {
        console.error("Error during task creation:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Get All Tasks Route
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: { sort: { createdAt: -1 } },
        });
        res.status(200).json({ data: userData }); // Fixed `UserData` to `userData`
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete Task Route
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update Task Route
router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        await Task.findByIdAndUpdate(id, { title : title, desc: desc });
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update Importance Task Route
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id); // Changed `TaskData` to `taskData`
        const impTask = TaskData.important;
        await Task.findByIdAndUpdate(id, { important: !impTask });
        res.status(200).json({ message: "Task importance updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update Completion Status Task Route
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id); // Changed `TaskData` to `taskData`
        const completeTask = TaskData.complete;
        await Task.findByIdAndUpdate(id, { complete: !completeTask });
        res.status(200).json({ message: "Task completion status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get Important Tasks Route
router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { important: true },
            options: { sort: { createdAt: -1 } },
        });
        const impTaskData = Data.tasks; // Fixed `Data` to `data`
        res.status(200).json({ data: impTaskData });
    } catch (error) {
        console.error("Error retrieving important tasks:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get Completed Tasks Route
router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: true },
            options: { sort: { createdAt: -1 } },
        });
        const compTaskData = Data.tasks; // Fixed `CompTaskData` to `compTaskData`
        res.status(200).json({ data: compTaskData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get Incomplete Tasks Route
router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: false },
            options: { sort: { createdAt: -1 } },
        });
        const incompTaskData = Data.tasks; // Fixed variable names
        res.status(200).json({ data: incompTaskData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

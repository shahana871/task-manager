const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
    try {
        if (!req.body.title) {
    return res.status(400).json({
        message: "Title is required",
    });
}
if (
    req.body.status &&
    !["Todo", "In Progress", "Done"].includes(req.body.status)
) {
    return res.status(400).json({
        message: "Invalid status",
    });
}
        const task = await Task.create({
            ...req.body,
            user: req.user.id,
        });
console.log(task);
res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
    try {
        const query = { user: req.user.id };

        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.search) {
            query.title = {
                $regex: req.query.search,
                $options: "i",
            };
        }

        const tasks = await Task.find(query);
console.log(tasks);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {

        console.log("ID:", req.params.id);
console.log("BODY:", req.body);
console.log("USER:", req.user);
        const task = await Task.findOneAndUpdate(
    {
        _id: req.params.id,
        user: req.user.id,
    },
    req.body,
    { new: true }
);
        

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
});

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
};
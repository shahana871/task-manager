const express = require("express");
const router = express.Router();

const {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

// Create a Task
router.post("/", protect, createTask);

// Get All Tasks
router.get("/", protect, getAllTasks);

// Update a Task
router.put("/:id", protect, updateTask);

// Delete a Task
router.delete("/:id", protect, deleteTask);

module.exports = router;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const taskRoutes = require("./src/routes/taskRoutes");
const userRoutes = require("./src/routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Task Manager API is running...");
});

const PORT = process.env.PORT || 5000;


 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
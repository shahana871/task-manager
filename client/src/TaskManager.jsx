import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { FaTasks } from "react-icons/fa";

function TaskManager({ onLogout }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("Medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = "http://localhost:5000/api/tasks";
      
      const params = [];
      if (filterStatus) params.push(`status=${filterStatus}`);
      if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
      
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery, filterStatus]);

  const handleAddTask = async () => {
    if (task.trim() === "") return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: task,
          status: "Todo",
          priority: priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks([...tasks, response.data]);
      setTask("");
      setPriority("Medium");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async (id, currentText) => {
    const updatedTask = prompt("Edit your task:", currentText);
    if (updatedTask && updatedTask.trim() !== "") {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/tasks/${id}`,
          {
            title: updatedTask,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleToggleComplete = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const currentStatus = item.status || (item.completed ? "Done" : "Todo");
      const newStatus = currentStatus === "Done" ? "Todo" : "Done";
      const isCompleted = newStatus === "Done";
      
      await axios.put(
        `http://localhost:5000/api/tasks/${item._id}`,
        {
          status: newStatus,
          completed: isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStatus = async (item, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const isCompleted = newStatus === "Done";
      
      await axios.put(
        `http://localhost:5000/api/tasks/${item._id}`,
        {
          status: newStatus,
          completed: isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header section */}
      <div className="dashboard-header">
        <div className="dashboard-title-area">
          <h1 className="dashboard-title">
            <FaTasks style={{ color: "var(--primary)" }} />
            Task Manager
          </h1>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Log Out
        </button>
      </div>

      {/* Main card */}
      <div className="dashboard-card">
        {/* Form layout */}
        <div className="task-form-grid">
          <input
            type="text"
            className="input-field"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <select
            className="form-select-custom"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button className="btn-primary-custom" onClick={handleAddTask}>
            + Add Task
          </button>
        </div>

        {/* Search and Filter layout */}
        <div className="search-filter-row">
          <input
            type="text"
            className="input-field"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="form-select-custom"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Task list section */}
        <div className="task-list-title-row">
          <h5 className="task-list-title">Your Tasks</h5>
          <span className="task-count-badge">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""}
          </span>
        </div>

        {tasks.length === 0 ? (
          <div className="no-tasks-state">
            No tasks to display. Get started by adding a task above!
          </div>
        ) : (
          tasks.map((item, index) => {
            const isCompleted = item.status === "Done" || item.completed;
            const currentStatus = item.status || (item.completed ? "Done" : "Todo");
            
            return (
              <div key={index} className="task-item-card">
                <div className="task-left-section">
                  <div
                    className={`custom-checkbox ${isCompleted ? "checked" : ""}`}
                    onClick={() => handleToggleComplete(item)}
                  >
                    {isCompleted && <span className="custom-checkbox-tick">✓</span>}
                  </div>

                  <div className="task-details">
                    <h6 className={`task-title ${isCompleted ? "completed" : ""}`}>
                      {item.title}
                    </h6>
                    {item.priority && (
                      <span className={`badge-custom badge-${item.priority.toLowerCase()}`}>
                        {item.priority}
                      </span>
                    )}
                  </div>
                </div>

                <div className="task-actions">
                  <select
                    className={`status-select ${
                      currentStatus === "Done"
                        ? "status-done"
                        : currentStatus === "In Progress"
                        ? "status-progress"
                        : "status-todo"
                    }`}
                    value={currentStatus}
                    onChange={(e) => handleUpdateStatus(item, e.target.value)}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <button
                    className="btn-action-edit"
                    onClick={() => handleEditTask(item._id, item.title)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-action-delete"
                    onClick={() => handleDeleteTask(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TaskManager;
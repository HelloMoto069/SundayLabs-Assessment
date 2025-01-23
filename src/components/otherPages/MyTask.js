import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pages.css";

const MyTask = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task1",
      startDate: "2025-01-22",
      dueDate: "2025-01-23",
      project: "Sunday-Labs-Assessment",
      completed: false,
    },
    {
      id: 2,
      name: "Task2",
      startDate: "2025-01-22",
      dueDate: "2025-01-24",
      project: "Sunday-Labs-Assessment",
      completed: false,
    },
  ]);

  const [filter, setFilter] = useState("all"); // Filter state: all, completed, incomplete
  const [editingTask, setEditingTask] = useState(null);
  const [currentTaskName, setCurrentTaskName] = useState("");
  const [editingDueDate, setEditingDueDate] = useState(null); // Sirf due date change krne k liye
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    taskId: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    startDate: "",
    dueDate: "",
    project: "",
  });

  const formatDueDate = (dueDate) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dateToCheck = new Date(dueDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };

    if (dateToCheck.toDateString() === today.toDateString()) {
      return "Today";
    } else if (dateToCheck.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return dateToCheck.toLocaleDateString("en-US", options); //  "03/January/2025" format
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleAddTask = () => {
    const { name, startDate, dueDate, project } = newTask;

    if (
      !name.trim() ||
      !startDate.trim() ||
      !dueDate.trim() ||
      !project.trim()
    ) {
      alert("Please fill in all fields to add a task.");
      return;
    }

    const newTaskObj = {
      id: tasks.length + 1,
      name,
      startDate,
      dueDate,
      project,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask({ name: "", startDate: "", dueDate: "", project: "" });
    setIsModalOpen(false);
  };

  const handleClearFields = () => {
    setNewTask({ name: "", startDate: "", dueDate: "", project: "" });
  };

  // Edit Task Name
  const handleEditTask = (id, name) => {
    setEditingTask(id);
    setCurrentTaskName(name);
  };

  const handleSaveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: currentTaskName || task.name } : task
      )
    );
    setEditingTask(null);
    setCurrentTaskName("");
  };

  // Edit Due Date
  const handleDueDateEdit = (id, dueDate) => {
    setEditingDueDate(id);
  };

  const handleDueDateChange = (id, newDueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, dueDate: newDueDate } : task
      )
    );
    setEditingDueDate(null);
  };

  // Right-Click Custom menu only delete
  const handleRightClick = (e, taskId) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, taskId });
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== contextMenu.taskId));
    setContextMenu({ visible: false, x: 0, y: 0, taskId: null });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, taskId: null });
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // "all" or default
  });

  return (
    <div className="task-manager-container" onClick={closeContextMenu}>
      <h3 className="mb-4">My Tasks</h3>

      {/* Add New Task Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-primary mb-3"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Task
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="filterDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-funnel"></i> Filter
          </button>
          <ul className="dropdown-menu" aria-labelledby="filterDropdown">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilter("all")}
              >
                All Tasks
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilter("completed")}
              >
                Completed Tasks
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilter("incomplete")}
              >
                Incomplete Tasks
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Task Table */}
      <table className="task-table table">
        <thead>
          <tr>
            <th>Complete</th>
            <th>Task Name</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr
              key={task.id}
              onContextMenu={(e) => handleRightClick(e, task.id)}
              style={{
                backgroundColor: task.completed ? "lightgreen" : "white",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  className="round-checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
              </td>
              <td>
                {editingTask === task.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={currentTaskName}
                    onChange={(e) => setCurrentTaskName(e.target.value)}
                    onBlur={() => handleSaveTask(task.id)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleEditTask(task.id, task.name)}>
                    {task.name}
                  </span>
                )}
              </td>
              <td>{formatDate(task.startDate)}</td>
              <td>
                {editingDueDate === task.id ? (
                  <input
                    type="date"
                    className="form-control"
                    value={task.dueDate}
                    onChange={(e) =>
                      handleDueDateChange(task.id, e.target.value)
                    }
                    onBlur={() => setEditingDueDate(null)}
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handleDueDateEdit(task.id, task.dueDate)}
                  >
                    {formatDueDate(task.dueDate)}
                  </span>
                )}
              </td>
              <td>{task.project}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Right click wala Context Menu */}
      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{
            position: "absolute",
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            padding: "5px",
          }}
        >
          <button className="btn btn-danger btn-sm" onClick={handleDeleteTask}>
            Delete Task
          </button>
        </div>
      )}

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter task name..."
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder="Enter start date..."
                  value={newTask.startDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, startDate: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder="Enter due date..."
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter project name..."
                  value={newTask.project}
                  onChange={(e) =>
                    setNewTask({ ...newTask, project: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddTask}>
                  Add Task
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleClearFields}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTask;

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TodoCard from "../components/TodoCard";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodos = async () => {
      if (!token) return; 

      try {
        const response = await fetch("http://localhost:5000/api/todos", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        const formattedTasks = data.map(task => ({ ...task, id: task._id }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTodos();
  }, [token]);

  const addTask = async () => {
    if (!newTask.trim()) return;
    
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTask })
      });
      
      const savedTask = await response.json();
      setTasks([...tasks, { ...savedTask, id: savedTask._id }]);
      setNewTask("");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const toggleTask = async (id) => {
    const taskToToggle = tasks.find(t => t.id === id);
    
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title: taskToToggle.title, 
          completed: !taskToToggle.completed 
        })
      });

      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const saveEdit = async (id) => {
    const taskToEdit = tasks.find(t => t.id === id);
    
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title: editText, 
          completed: taskToEdit.completed 
        })
      });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, title: editText } : task
      ));
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">
        Todo Manager
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold">{tasks.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Completed Tasks</h3>
          <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Tasks</h3>
          <p className="text-2xl font-bold text-red-600">{pendingTasks}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      <AnimatePresence>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TodoCard
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              setEditingId={setEditingId}
              saveEdit={saveEdit}
            />
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
}
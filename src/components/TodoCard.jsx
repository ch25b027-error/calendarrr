import { motion } from "framer-motion";

export default function TodoCard({ task,toggleTask,deleteTask,editingId,editText,setEditText,setEditingId,saveEdit}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      whileHover={{
        scale: 1.02,
      }}
      className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5" />
        {editingId === task.id ? (
          <input
            value={editText}
            onChange={(e) =>
              setEditText(e.target.value)
            }
            className="border rounded px-2 py-1 w-full" />
        ) : (
          <span
            className={`${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}>
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {editingId === task.id ? (
          <button
            onClick={() => saveEdit(task.id)}
            className="bg-green-500 text-white px-3 py-1 rounded">
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setEditingId(task.id);
              setEditText(task.title);
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded">
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </motion.li>
  );
}
import { motion } from "framer-motion";

export default function EmployeeCard({ employee, variants }) {
  return (
    <motion.div
      layout
      variants={variants}
      whileHover={{
        scale: 1.04,
        y: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className="bg-white rounded-xl shadow-md p-5 cursor-pointer"
    >
      <div className="flex flex-col items-center">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {employee.name}
        </h2>
        <p className="text-blue-600 font-medium">
          {employee.role}
        </p>
        <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {employee.department}
        </span>
        <p className="mt-4 text-gray-500 text-sm text-center">
          {employee.email}
        </p>
      </div>
    </motion.div>
  );
}
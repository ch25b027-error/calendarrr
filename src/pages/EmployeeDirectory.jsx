import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import employeesData from "../data/employees.json";
import EmployeeCard from "../components/EmployeeCard";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
        duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 1.5,
    },
  },
};
const departments = [
  "All",
  "Engineering",
  "HR",
  "Design",
  "Finance",
];

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState(employeesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("All");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900">
          Employee Directory
        </h1>
        <p className="text-gray-600 mt-2">
          Find and connect with employees across departments.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 mb-8">
        
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-3 mt-4">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartment(dept)}
              className={`px-4 py-2 rounded-lg transition-all ${
                department === dept
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            variants={cardVariants}
          />
        ))}
      </motion.div>

      {filteredEmployees.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No employees found.
        </div>
      )}
    </div>
  );
}
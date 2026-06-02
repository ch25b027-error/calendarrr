import { motion } from "framer-motion";

export default function LeaveProgress({ request }) {
  const statusColor =
    request.status === "Approved"
      ? "bg-green-100 text-green-700"
      : request.status === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -3,
      }}
      className="bg-white rounded-xl shadow-md p-5"
    >
      <h3 className="text-lg font-semibold text-blue-900">
        {request.reason}
      </h3>

      <p className="text-gray-600 mt-2">
        {request.days} Day(s)
      </p>

      <span
        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
      >
        {request.status}
      </span>
    </motion.div>
  );
}
import { motion } from "framer-motion";
import announcementsData from "../data/announcements.json";

export default function AnnouncementModal({
  announcement,
  onReadMore,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className="bg-white rounded-xl shadow-md p-5"
    >
      <h2 className="text-xl font-bold text-blue-900">
        {announcement.title}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        {announcement.date}
      </p>
      <p className="text-gray-700 mt-3">
        {announcement.summary}
      </p>
      <button
        onClick={() => onReadMore(announcement)}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >Read More</button>
    </motion.div>
  );
}
import { useState } from "react";
import {motion,AnimatePresence} from "framer-motion";
import AnnouncementModal from "../components/Announcement";
import announcementsData from "../data/announcements.json";

export default function Announcements() {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          Company Announcements
        </h1>

        <p className="text-gray-600 mb-8">
          Stay updated with company news,
          events, and important notices.
        </p>
      </motion.div>

      <motion.div
       initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.5,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcementsData.map(
            (announcement) => (
              <AnnouncementModal
                key={announcement.id}
                announcement={announcement}
                onReadMore={
                  setSelectedAnnouncement
                }
              />
            )
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedAnnouncement && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setSelectedAnnouncement(null)
              }
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
              }}
              transition={{
                delay: 0.1,
                duration: 0.4,
              }}
            >
              <div className="bg-white max-w-2xl w-full rounded-xl shadow-xl p-6">
                <h2 className="text-3xl font-bold text-blue-900">
                  {selectedAnnouncement.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {selectedAnnouncement.date}
                </p>

                <div className="mt-6 text-gray-700 leading-relaxed">
                  {selectedAnnouncement.content}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() =>
                      setSelectedAnnouncement(
                        null
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >Close</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
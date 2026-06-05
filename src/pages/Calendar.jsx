import { motion, AnimatePresence } from "framer-motion";
import {  Calendar as BigCalendar,dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {format,parse,startOfWeek,getDay} from "date-fns";
import { enUS } from "date-fns/locale";
import meetingsData from "../data/meetings.json";
import { useState } from "react";

const locales = {"en-US": enUS};
const localizer = dateFnsLocalizer({ format,parse,startOfWeek,getDay,locales});

export default function Calendar() {
    const [showModal, setShowModal] = useState(false);

const [meetings, setMeetings] = useState(
  meetingsData.map((meeting) => ({
    ...meeting,
    start: new Date(meeting.start),
    end: new Date(meeting.end),
  }))
);

const [newMeeting, setNewMeeting] = useState({
  title: "",
  start: "",
  end: "",
});
    const [selectedEvent, setSelectedEvent] = useState(null);
  const events = meetingsData.map((meeting) => ({
    ...meeting,
    start: new Date(meeting.start),
    end: new Date(meeting.end),
  }));

  const addMeeting = () => {
  if (
    !newMeeting.title ||
    !newMeeting.start ||
    !newMeeting.end
  )
    return;

  const meeting = {
    id: Date.now(),
    title: newMeeting.title,
    start: new Date(newMeeting.start),
    end: new Date(newMeeting.end),
  };

  setMeetings([...meetings, meeting]);

  setNewMeeting({
    title: "",
    start: "",
    end: "",
  });

  setShowModal(false);
};

  const totalMeetings = events.length;
  const today = new Date();
  const todaysMeetings = events.filter(
    (meeting) =>
      meeting.start.toDateString() ===
      today.toDateString()
  ).length;
  const upcomingMeetings = events.filter(
    (meeting) => meeting.start > today
  ).length;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="min-h-screen bg-slate-100 p-6"
    >

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900">
          Meeting Calendar
        </h1>
        <p className="text-gray-600 mt-2">
          Manage meetings and schedules across the organization.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total Meetings
          </h3>
          <p className="text-3xl font-bold text-blue-700">
            {totalMeetings}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Today's Meetings
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {todaysMeetings}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Upcoming Meetings
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {upcomingMeetings}
          </p>
        </div>
      </div>
<div className="flex justify-center items-center">
      <button
    onClick={() => setShowModal(true)}
    className="bg-blue-600 hover:bg-blue-700 mb-6  text-white px-8 py-3 rounded-lg font-medium"
  >
    + New Meeting
  </button>
  </div>

      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex justify-end mb-4">
            </div>
        <BigCalendar
          localizer={localizer}
          events={meetings}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectEvent={(event) => {
            setSelectedEvent(event);
          }}
          onSelectSlot={(slotInfo) =>{
            console.log(slotInfo)
          }}
          style={{height: "700px"}}
        />
      </div>
      
        <AnimatePresence>
  {selectedEvent && (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-xl m-4 font-bold">
          {selectedEvent.title}
        </h2>
        <p className="mb-4">
          {selectedEvent.start.toLocaleString()}
        </p>
        <button
          onClick={() => setSelectedEvent(null)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
<AnimatePresence>
{showModal && (
  <motion.div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-white p-6 rounded-xl w-[450px] shadow-xl">

      <h2 className="text-2xl font-bold mb-4">
        Create Meeting
      </h2>

      <input
        type="text"
        placeholder="Meeting Title"
        value={newMeeting.title}
        onChange={(e) =>
          setNewMeeting({
            ...newMeeting,
            title: e.target.value,
          })
        }
        className="w-full border p-2 rounded mb-3"
      />

      <label className="block mb-1">
        Start Time
      </label>

      <input
        type="datetime-local"
        value={newMeeting.start}
        onChange={(e) =>
          setNewMeeting({
            ...newMeeting,
            start: e.target.value,
          })
        }
        className="w-full border p-2 rounded mb-3"
      />
      <label className="block mb-1">
        End Time
      </label>
      <input
        type="datetime-local"
        value={newMeeting.end}
        onChange={(e) =>
          setNewMeeting({
            ...newMeeting,
            end: e.target.value,
          })
        }
        className="w-full border p-2 rounded mb-5"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >Cancel</button>
        <button
          onClick={addMeeting}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >Save</button>
      </div>

    </div>
  </motion.div>
)}
        </AnimatePresence>
    </motion.div>
  );
}
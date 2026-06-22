import { motion, AnimatePresence } from "framer-motion";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useState, useEffect } from "react";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function Calendar() {
  const [showModal, setShowModal] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const [newMeeting, setNewMeeting] = useState({ title: "", start: "", end: "", spaceId: "" });
  const [spaceInput, setSpaceInput] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchSpaces();
    fetchMeetings();
  }, []);

  useEffect(() => {
    const alertedMeetings = new Set();

    const timer = setInterval(() => {
      const now = new Date();

      meetings.forEach(meeting => {
        const diffInMs = meeting.start.getTime() - now.getTime();
        const diffInMinutes = Math.floor(diffInMs / 60000);
        if (diffInMinutes === 5 && !alertedMeetings.has(meeting._id)) {
          alertedMeetings.add(meeting._id);
          alert(`Reminder: Your meeting "${meeting.title}" starts in 5 minutes!`);
        }
      });

      setMeetings(prevMeetings => {
        const futureMeetings = prevMeetings.filter(meeting => meeting.end > now);
        
        if (futureMeetings.length !== prevMeetings.length) {
          return futureMeetings;
        }
        return prevMeetings;
      });
      setSpaces(prevSpaces => {
        const activeSpaces = prevSpaces.filter(space => !space.expiresAt || space.expiresAt > now);
        if (activeSpaces.length !== prevSpaces.length) return activeSpaces;
        return prevSpaces;
      });
    }, 30000);
    return () => clearInterval(timer);
  }, [meetings]);

  const fetchSpaces = async () => {
    if (!token) return;
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/spaces`, { headers: { "Authorization": `Bearer ${token}` }});
    if (res.ok) {
      const data = await res.json()
      const formattedSpaces = data.map(s => ({
        ...s,
        expiresAt: s.expiresAt ? new Date(s.expiresAt) : null
      }));
      setSpaces(formattedSpaces);
    }
  };

  const fetchMeetings = async () => {
    if (!token) return;
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/meetings`, { headers: { "Authorization": `Bearer ${token}` }});
    if (res.ok) {
      const data = await res.json();
      const formattedMeetings = data.map(m => ({ ...m, start: new Date(m.start), end: new Date(m.end) }));
      setMeetings(formattedMeetings);
    }
  };

  const handleCreateSpace = async () => {
    if (!spaceInput) return;
    const res = await fetch("http://localhost:5000/api/spaces", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ name: spaceInput })
    });
    
    if (res.ok) {
      const createdSpace = await res.json(); 
      setSpaceInput("");
      fetchSpaces();
      setNewMeeting({ title: "", start: "", end: "", spaceId: createdSpace._id });
      setShowModal(true);
    }
  };

  const handleJoinSpace = async () => {
    if (!spaceInput) return;
    const res = await fetch("http://localhost:5000/api/spaces/join", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ joinCode: spaceInput })
    });
    
    if (res.ok) {
      setSpaceInput("");
      fetchSpaces();
      fetchMeetings();
      alert("Space joined! The meetings have automatically been added to your calendar.");
    } else {
      alert("Invalid code or you are already in this space.");
    }
  };

  const addMeeting = async () => {
    if (!newMeeting.title || !newMeeting.start || !newMeeting.end || !newMeeting.spaceId) return;

    const res = await fetch("http://localhost:5000/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(newMeeting)
    });

    if (res.ok) {
      fetchMeetings();
      setNewMeeting({ title: "", start: "", end: "", spaceId: "" });
      setShowModal(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="min-h-screen bg-slate-100 p-6">
      
      <div className="flex flex-col justify-between mb-8 gap-10">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl font-bold text-blue-900">Meeting Calendar</h1>
          <p className="text-gray-600 mt-2">Manage meetings across the organization.</p>
        </div>
        <div className="flex items-center justify-center">
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center gap-3 border border-gray-200">
          <h2 className="font-bold text-lg text-gray-700">My Workspaces</h2>
          {spaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center items-center mb-2">
              {spaces.map(s => <span key={s._id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-mono">Code: {s.joinCode} - {s.name}</span>)}
            </div>
          ) : <p className="text-xs text-red-500 mb-2">You aren't in any spaces. Create or join one!</p>}
          
          <div className="flex gap-2">
            <input type="text" placeholder="Space Name / Join Code" value={spaceInput} onChange={(e) => setSpaceInput(e.target.value)} className="border focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded text-sm w-48" />
            <button onClick={handleCreateSpace} className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700">Create</button>
            <button onClick={handleJoinSpace} className="bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded hover:bg-gray-300">Join</button>
          </div>
        </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <BigCalendar
          localizer={localizer}
          events={meetings}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectEvent={(event) => setSelectedEvent(event)}
          style={{ height: "700px" }}
        />
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 200 }}>
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
              <h2 className="text-2xl font-bold mb-2 text-blue-900">{selectedEvent.title}</h2>
              <p className="text-gray-600 mb-6">{selectedEvent.start.toLocaleString()}</p>
              <button onClick={() => setSelectedEvent(null)} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold">Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-white p-6 rounded-xl w-[450px] shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Create Meeting</h2>
              <div className="hidden">
                <label className="block mb-1 font-medium">Select Space</label>
                <select value={newMeeting.spaceId} onChange={(e) => setNewMeeting({ ...newMeeting, spaceId: e.target.value })} className="focus:outline-none focus:ring-2 focus:ring-blue-500 w-full border p-2 rounded mb-3 bg-white">
                  <option value="" disabled>Choose a workspace...</option>
                  {spaces.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              <label className="block mb-1 font-medium">Meeting Title</label>
              <input type="text" value={newMeeting.title} onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })} className="w-full border border-gray-300  p-2 rounded mb-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"/>

              <label className="block mb-1 font-medium">Start Time</label>
              <input type="datetime-local" value={newMeeting.start} onChange={(e) => setNewMeeting({ ...newMeeting, start: e.target.value })} className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border p-2 rounded mb-3" />
              
              <label className="block mb-1 font-medium">End Time</label>
              <input type="datetime-local" value={newMeeting.end} onChange={(e) => setNewMeeting({ ...newMeeting, end: e.target.value })} className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border p-2 rounded mb-5" />

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700">Cancel</button>
                <button onClick={addMeeting} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold">Save</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
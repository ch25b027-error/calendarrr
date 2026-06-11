import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeaveProgress from "../components/LeaveProgress";
import leaveData from "../data/leaveReuest.json";

export default function Leave() {
  const [requests, setRequests] = useState(leaveData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);
  const totalPtoDays = 20;

  const usedPtoDays = requests.reduce(
    (total, request) => total + request.days, 0
  );

  const remainingPtoDays =
    totalPtoDays - usedPtoDays;
  const submitLeave = () => {
    if (!startDate || !endDate || !reason)
      return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil( (end - start) / (1000 * 60 * 60 * 24) ) + 1;
    const newRequest = {
      id: Date.now(),
      reason,
      days: diff,
      status: "Pending",
    };

    setRequests([
      ...requests,
      newRequest,
    ]);
    setStartDate("");
    setEndDate("");
    setReason("");
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };
  return (
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
    <div className="min-h-screen bg-slate-100 p-6 mb-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">
        Leave Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total PTO
          </h3>
          <p className="text-3xl font-bold text-blue-700">
            {totalPtoDays}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Used PTO
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {usedPtoDays}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Remaining PTO
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {remainingPtoDays}
          </p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow mb-8">
        <h3 className="font-semibold mb-4">
          PTO Usage
        </h3>
        <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            animate={{width: `${(usedPtoDays /totalPtoDays) *100}%`,}}
            transition={{
              duration: 0.8,
            }}
          />
        </div>
        <p className="mt-3 text-gray-600">
          {usedPtoDays} / {totalPtoDays} Days Used
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Request Leave</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            className="border p-3 rounded-lg"
          />
        </div>
        <textarea
          placeholder="Reason for leave..."
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          className="w-full border p-3 rounded-lg mt-4"
          rows="4"
        />
        <button
          onClick={submitLeave}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        > Submit Request</button>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              className="mt-4 text-green-600 font-semibold"
            > Leave Request Submitted
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-5">
          Leave History
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {requests.map((request) => (
            <LeaveProgress
              key={request.id}
              request={request}
            />
          ))}
        </div>
      </div>
    </div>
    </motion.div>
  );
}
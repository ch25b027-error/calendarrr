import StatCard from "../components/StatCard";
import {Link} from "react-router-dom";
import { CheckSquare, Calendar, Plane, Bell } from "lucide-react";
import {motion} from "framer-motion";
import announcementsData from "../data/announcements.json";
import tasksData from "../data/tasks.json";
import meetingsData from "../data/meetings.json";
import leaveData from "../data/leaveReuest.json";

const Dashboard = () => {
  const pendingTasks = tasksData.filter(
    (task) => task.completed === false
  ).length;

  const today = new Date().toISOString().split("T")[0];
  const meetingsToday = meetingsData.filter(
    (meeting) => meeting.start.split("T")[0] === today
  ).length;

  const ptoUsed = leaveData.reduce((total, request) => total+request.days, 0);
  const ptoRemaining = 20 - ptoUsed;

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
    <div className="grid z-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-6 p-4 my-4 justify-center  items-center">
      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02
        }}
      >
        <Link to="/todo">
         <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={<CheckSquare />}
        />
        </Link>
      </motion.div>
      
      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02
        }}
      >
        <Link to="/calendar">
        <StatCard
          title="Meetings Today"
          value={meetingsToday}
          icon={<Calendar />}
        />
        </Link>
      </motion.div>

      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02
        }}
      >
        <Link to="/leave">
          <StatCard
            title="PTO Remaining"
            value={`${ptoRemaining} Days`}
            icon={<Plane />}
          />
        </Link>
      </motion.div>

      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02
        }}
      >
        <Link to="/announcements">
        <StatCard
          title="Announcements"
          value={announcementsData.length}
          icon={<Bell />}
        />
        </Link>
      </motion.div>
    </div>
    </motion.div>
  );
}
 
export default Dashboard;
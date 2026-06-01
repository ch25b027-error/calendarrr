import StatCard from "../components/StatCard";
import { CheckSquare, Calendar, Plane, Bell } from "lucide-react";
import {motion} from "framer-motion";

const Dashboard = () => {
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-6 p-4 my-4 justify-center  items-center">
      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02
        }}
      >
        <StatCard
          title="Pending Tasks"
          value="12"
          icon={<CheckSquare />}
        />
      </motion.div>
      
      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02
        }}
      >
        <StatCard
          title="Meetings Today"
          value="4"
          icon={<Calendar />}
        />
      </motion.div>

      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02
        }}
      >
        <StatCard
          title="PTO Remaining"
          value="8 Days"
          icon={<Plane />}
        />
      </motion.div>

      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02
        }}
      >
        <StatCard
          title="Announcements"
          value="3"
          icon={<Bell />}
        />
      </motion.div>
    </div>
  );
}
 
export default Dashboard;
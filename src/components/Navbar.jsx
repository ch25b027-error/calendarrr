import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Link, NavLink} from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenu from "./Hamburger";

const Navbar = () => {
    const svgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const pathVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0 
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 4.0,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2.0,
        ease: "easeInOut"
      }
    }
  };
   return (
    <nav className="bg-blue-800 z-100 shadow-lg">
      <div className="max-w-7xl z-100 mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">


          <div className="flex items-center justify-center h-16 bg-blue-800 rounded-lg">
      
            <motion.svg 
                width="36" 
                height="41" 
                viewBox="0 0 10 10" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="bg-blue-800 inline-block align-middle"
                initial="hidden"
                animate="visible"
                variants={svgVariants}
                >
                <motion.path 
                    d="M4.5 0.5 H0.5 V8.5 H8.5 V4.5 H4.5 Z" 
                    stroke="white" 
                    strokeWidth="0.6"
                    strokeLinejoin="round"
                    variants={pathVariants}
                />
                
                <motion.path 
                    d="M6 -0.5 H9.5 V3 H6 Z" 
                    stroke="white" 
                    strokeWidth="0.6"
                    strokeLinejoin="round"
                    variants={pathVariants}
                />
                </motion.svg>
          
    </div>

          <h1 className="text-xl font-bold text-white">
            CorporateHub
          </h1>
        </div>

        <div className="flex text-gray-300 sm:hidden md:block items-center gap-2">
          <NavLink className="hover:text-white hover:bg-blue-600 p-2 rounded-lg" to="/">Dashboard</NavLink>
          <NavLink className="hover:text-white hover:bg-blue-600 p-2 rounded-lg" to="/employees">Employees</NavLink>
          <NavLink className="hover:text-white hover:bg-blue-600 p-2 rounded-lg" to="/calendar">Calendar</NavLink>
          <NavLink className="hover:text-white hover:bg-blue-600 p-2 rounded-lg" to="/todo">Todo</NavLink>
          <NavLink className="hover:text-white hover:bg-blue-600 p-2 rounded-lg" to="/announcements">Announcements</NavLink>
          <NavLink className="hover:text-white hover:bg-blue-600 p-2 rounded-lg" to="/leave">Leave</NavLink>
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
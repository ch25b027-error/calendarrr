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
      <div className="max-w-7xl z-100 mx-6 px-2 h-16 flex items-center justify-between">
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

        <div className="flex text-gray-300 hidden lg:block items-center gap-6">
          <NavLink to="/" className={({ isActive }) =>
    `p-2 rounded-lg hover:bg-blue-700 hover:text-white ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400"
    }`
  }>Dashboard</NavLink>
          <NavLink to="/employees" className={({ isActive }) =>
    `p-2 rounded-lg hover:bg-blue-700 hover:text-white ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400"
    }`
  }>Employees</NavLink>
          <NavLink to="/calendar" className={({ isActive }) =>
    `p-2 rounded-lg hover:bg-blue-700 hover:text-white ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400"
    }`
  }>Calendar</NavLink>
          <NavLink to="/todo" className={({ isActive }) =>
    `p-2 rounded-lg hover:bg-blue-700 hover:text-white ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400"
    }`
  }>Todo</NavLink>
          <NavLink to="/announcements" className={({ isActive }) =>
    `p-2 rounded-lg hover:bg-blue-700 hover:text-white ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400"
    }`
  }>Announcements</NavLink>
          <NavLink to="/leave" className={({ isActive }) =>
    `p-2 rounded-lg hover:bg-blue-700 hover:text-white ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400"
    }`
  }>Leave</NavLink>
        </div>
        <div className="block lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
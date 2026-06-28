// 

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenu from "./Hamburger";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username') || '';
  
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-800 z-100 shadow-lg">
      <div className="max-w-8xl w-full z-100 mx-auto px-2 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center mx-4 justify-center h-16 bg-blue-800 rounded-lg">
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

        <div className="text-gray-300 mr-6 hidden lg:flex items-center gap-2">
          <NavLink to="/" className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white ${isActive ? "bg-blue-600 text-white" : "text-gray-400"}`
          }>Dashboard</NavLink>
          
          <NavLink to="/employees" className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white ${isActive ? "bg-blue-600 text-white" : "text-gray-400"}`
          }>Employees</NavLink>
          
          <NavLink to="/calendar" className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white ${isActive ? "bg-blue-600 text-white" : "text-gray-400"}`
          }>Calendar</NavLink>
          
          <NavLink to="/todo" className={({ isActive }) =>
            `px-4 py-2 mx-1 rounded-lg hover:bg-blue-700 hover:text-white ${isActive ? "bg-blue-600 text-white" : "text-gray-400"}`
          }>Todo</NavLink>
          
          <NavLink to="/announcements" className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white ${isActive ? "bg-blue-600 text-white" : "text-gray-400"}`
          }>Announcements</NavLink>
          
          <NavLink to="/leave" className={({ isActive }) =>
            `px-4 py-2 mx-1 rounded-lg hover:bg-blue-700 hover:text-white ${isActive ? "bg-blue-600 text-white" : "text-gray-400"}`
          }>Leave</NavLink>
          {isLoggedIn ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-blue-600">
              <span className="text-white font-medium">
                Hi, <span className="font-bold text-blue-300">{storedUsername}</span>!
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <NavLink to="/signup" className={({ isActive }) =>
                `px-4 py-2 rounded-lg border-black transition-colors ${isActive ? "bg-blue-500 text-white shadow-sm" : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"}`
              }>SignUp</NavLink>
              
              <NavLink to="/login" className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-blue-500 text-white shadow-sm" : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"}`
              }>Login</NavLink>
            </div>
          )}
        </div>
        
        <div className="block lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
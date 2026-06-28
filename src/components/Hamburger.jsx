import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isLoggedIn = !!localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username') || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsOpen(false);
    window.location.href = '/login'; 
  };

  return (
    <>
      <Hamburger
        toggled={isOpen}
        toggle={setIsOpen}
        size={24}
        color="#fff"
      />
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed top-16 left-0 right-0 bottom-0 bg-black/10 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
              className="absolute top-16 text-gray-300 right-0 bg-blue-900 sm:w-80 z-50 w-[60%] min-h-screen flex flex-col items-center p-8 gap-2 shadow-xl"
            >
              <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full">
                <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/">Dashboard</Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full">
                <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/employees">Employees</Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full">
                <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/calendar">Calendar</Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full">
                <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/todo">Todo</Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full">
                <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/announcements">Announcements</Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full">
                <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/leave">Leave</Link>
              </motion.div>

              <div className="w-full border-t border-blue-700 my-2"></div>

              {isLoggedIn ? (
                <>
                  <div className="w-full text-center p-2 text-white font-medium">
                    Hi, <span className="font-bold text-blue-300">{storedUsername}</span>!
                  </div>
                  <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full mt-2">
                    <button 
                      onClick={handleLogout} 
                      className='bg-red-500 hover:bg-red-600 text-white font-semibold p-3 w-full h-12 flex items-center justify-center rounded-lg transition-colors'
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full">
                    <Link className='bg-blue-500 hover:bg-blue-400 text-white font-semibold p-3 w-full h-12 flex items-center justify-center rounded-lg transition-colors' onClick={() => setIsOpen(false)} to="/signup">SignUp</Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -3, scale: 1.1, type: "spring", stiffness: 300 }} className="w-full mt-2">
                    <Link className='bg-gray-200 hover:bg-white text-gray-800 font-semibold p-3 w-full h-12 flex items-center justify-center rounded-lg transition-colors' onClick={() => setIsOpen(false)} to="/Login">Login</Link>
                  </motion.div>
                </>
              )}
              
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
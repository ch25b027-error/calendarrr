import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.3}}
        onClick={() => setIsOpen(false)}
        className="fixed top-16 left-0 right-0 bottom-0 bg-black/10 backdrop-blur-sm z-40"
      />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className="absolute top-16 text-gray-300 right-0 bg-blue-900 sm:w-80 z-50 md:w-[60%] h-screen flex flex-col items-center p-14 gap-2 shadow-xl"
          >
            <motion.div
            whileHover={{
              y: -3,
              scale: 1.2,
              type: "spring",
              stiffness: 300
            }} className="w-full">
            <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/">Dashboard</Link></motion.div>
            <motion.div
            whileHover={{
              y: -3,
              scale: 1.2,
              type: "spring",
              stiffness: 300
            }} className="w-full">
            <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/employees">Employees</Link></motion.div>
            <motion.div
            whileHover={{
              y: -3,
              scale: 1.2,
              type: "spring",
              stiffness: 300
            }} className="w-full">
            <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/calendar">Calendar</Link></motion.div>
            <motion.div
            whileHover={{
              y: -3,
              scale: 1.2,
              type: "spring",
              stiffness: 300
            }} className="w-full">
            <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/todo">Todo</Link></motion.div>
            <motion.div
            whileHover={{
              y: -3,
              scale: 1.2,
              type: "spring",
              stiffness: 300
            }} className="w-full">
            <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/announcements">Announcements</Link></motion.div>
            <motion.div
            whileHover={{
              y: -3,
              scale: 1.2,
              type: "spring",
              stiffness: 300
            }} className="w-full">
            <Link className='hover:text-white hover:bg-blue-800 p-3 w-full h-12 flex items-center justify-center rounded-lg' onClick={() => setIsOpen(false)} to="/leave">Leave</Link></motion.div>
          </motion.div>

        </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
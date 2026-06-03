import notFoundImage from '../assets/notfound.png';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';

const NotFound = () => {
    return ( 
        <div className="p-4">
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
            <h1 className="text-3xl text-blue-800 flex items-center justify-center font-bold">Page Not Found</h1>
            <img src={notFoundImage} alt="Not Found" className="mx-auto w-4/5 lg:w-1/2 h-auto mb-4" />
            <motion.p
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-center"
            >
                <Link to="/" className="text-gray-200 bg-blue-600 p-4 rounded-xl text-lg hover:bg-blue-700 hover:text-gray-100">Go back to Home ➯</Link>
            </motion.p>
        </motion.div>
        </div>
     );
}
 
export default NotFound;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setMessage('');
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setMessage(`Welcome back, ${data.username}! Redirecting...`);
        
        setTimeout(() => {
          window.location.href = '/';
        });
      } else {
        if (data.errors) {
          setEmailError(data.errors.email);
          setPasswordError(data.errors.password);
        } else {
          setGeneralError(data.message || 'Login failed');
        }
      }
    } catch (error) {
      setGeneralError('Server error. Is your backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full min-h-screen flex items-center justify-center bg-blue-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-center text-blue-900">
              Log In
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {emailError && <p className="text-red-500 text-xs mt-1 ml-1">{emailError}</p>}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {passwordError && <p className="text-red-500 text-xs mt-1 ml-1">{passwordError}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>
            {message && (
              <p className="text-center text-sm text-green-600 font-medium">
                {message}
              </p>
            )}
            {generalError && (
              <p className="text-center text-sm text-red-500">
                {generalError}
              </p>
            )}
            <p className='text-sm text-center'>Don't have an account? <Link to={'/signup'} className='text-blue-500 hover:cursor-pointer px-1 text-base font-semibold hover:text-blue-800'>Click here</Link> to create one</p>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
}
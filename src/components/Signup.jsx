import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  
  const [usernameError, setUsernameError] = useState('');
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
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/Login';
        }); 
      } else {
        if (data.errors) {
          setUsernameError(data.errors.username);
          setEmailError(data.errors.email);
          setPasswordError(data.errors.password);
        } else {
          setGeneralError(data.message || 'User already exists');
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
            <div className="text-center">
              <h1 className="text-3xl font-bold text-blue-900">
                Create Account
              </h1>
              <p className="text-gray-500 mt-1">
                Join CorporateHub
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  onChange={handleChange}
                  value={formData.username}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {usernameError && <p className="text-red-500 text-xs mt-1 ml-1">{usernameError}</p>}
              </div>

              <div>
                <input
                  type="text"
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
                {isLoading ? "Creating Account..." : "Sign Up"}
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
            
          </div>
        </div>
      </div>
    </motion.div>
  );
}
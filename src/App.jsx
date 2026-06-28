import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Employees from './pages/EmployeeDirectory';
import Todo from './pages/Todo';
import Calendar from './pages/Calendar';
import Announcements from './pages/Announcements';
import Leave from './pages/LeaveManagement';
import NotFound from './pages/NotFound';
import Signup from './components/Signup'
import Login from './components/Login'
import './index.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />

          <Route
          path='/employees'
          element={
            <ProtectedRoute>
              <Employees/>
            </ProtectedRoute>
          }/>

          <Route
          path='/calendar'
          element={
            <ProtectedRoute>
              <Calendar/>
            </ProtectedRoute>
          }/>

          <Route
          path='/todo'
          element={
            <ProtectedRoute>
              <Todo/>
            </ProtectedRoute>
          }/>

          <Route
          path='/announcements'
          element={
            <ProtectedRoute>
              <Announcements/>
            </ProtectedRoute>
          }/>

          <Route
          path='/leave'
          element={
            <ProtectedRoute>
              <Leave/>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

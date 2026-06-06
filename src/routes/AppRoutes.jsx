import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home filter="All" />} />
        <Route path="/my-tasks" element={<Home filter="My Tasks" />} />
        <Route path="/due-today" element={<Home filter="Due Today" />} />
        <Route path="/important" element={<Home filter="High" />} />
      </Route>

      {/* 404 Catch-all Route for Error Boundary */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

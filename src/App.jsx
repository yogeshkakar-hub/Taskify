import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className="app-container">
            <Toaster position="top-right" toastOptions={{
              style: {
                background: '#16213e',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }
            }} />
            <AppRoutes />
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;

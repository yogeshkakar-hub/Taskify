import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem', color: '#f8fafc' }}>
      <h1 style={{ fontSize: '4rem', color: '#ef4444' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        style={{ 
          padding: '0.75rem 1.5rem', 
          background: '#3b82f6', 
          color: '#fff', 
          textDecoration: 'none', 
          borderRadius: '8px' 
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;

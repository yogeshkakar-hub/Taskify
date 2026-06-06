import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Mock the useAuth hook to simulate authenticated/unauthenticated states
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Helper function to render components wrapped in BrowserRouter
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Navbar Component Rendering Tests', () => {
  
  test('renders standard public navigation links (Taskify, Home, About, Contact)', () => {
    // Mock return value for unauthenticated state
    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn(),
    });

    renderWithRouter(<Navbar />);

    expect(screen.getByText('Taskify')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders Login link when user is unauthenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn(),
    });

    renderWithRouter(<Navbar />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('renders User Greeting and Logout button when user is authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Alice' },
      logout: jest.fn(),
    });

    renderWithRouter(<Navbar />);

    expect(screen.getByText('Hi, Alice')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});

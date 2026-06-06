import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await api.todos.getAll();
      if (res.status === 200) {
        setTasks(res.data);
      }
    } catch (err) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title, priority) => {
    try {
      const res = await api.todos.create(title, priority);
      if (res.status === 201) {
        setTasks((prev) => [res.data, ...prev]);
        toast.success('Task Added');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to add task');
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await api.todos.toggle(id);
      if (res.status === 200) {
        setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.todos.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success('Task Deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

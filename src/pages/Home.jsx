import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Trash2, Clock, AlertCircle } from 'lucide-react';

const Home = ({ filter = 'All' }) => {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    await addTask(newTaskTitle, priority);
    setNewTaskTitle('');
    setPriority('Medium');
  };

  const getPriorityColor = (level) => {
    switch (level) {
      case 'High': return '#ff4d4d'; // Neon Red
      case 'Medium': return '#f59e0b'; // Amber
      case 'Low': return '#10b981'; // Emerald
      default: return '#3b82f6';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const displayTasks = tasks.filter((todo) => {
    if (filter === 'High') return todo.priority === 'High';
    if (filter === 'Due Today' || filter === 'My Tasks') return true; // Placeholder for future logic
    return true; // 'All'
  });

  return (
    <div style={{
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      width: '100%',
      maxWidth: '1200px'
    }}>
      <div>
        
        {/* Header Section */}
        <header style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Dashboard {filter !== 'All' && `- ${filter}`}
          </h1>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Manage your tasks with advanced micro-animations</p>
        </header>

        {/* Add Task Form (Glassmorphism) */}
        <motion.form 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleAddTask}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '3rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
          }}
        >
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            style={{
              flex: '1 1 0%',
              minWidth: '200px',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '0 1.5rem',
              borderRadius: '8px',
              color: '#fff',
              outline: 'none',
              fontSize: '1rem',
              height: '48px',
              transition: 'all 0.3s',
              boxSizing: 'border-box'
            }}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              padding: '0 1.5rem',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
              outline: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              appearance: 'none',
              width: '160px',
              height: '48px',
              boxSizing: 'border-box'
            }}
          >
            <option value="High" style={{ background: '#0f172a' }}>High Priority</option>
            <option value="Medium" style={{ background: '#0f172a' }}>Medium Priority</option>
            <option value="Low" style={{ background: '#0f172a' }}>Low Priority</option>
          </select>
          <button
            type="submit"
            style={{
              padding: '0 2rem',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Add Task
          </button>
        </motion.form>

        {/* Loading State */}
        {loading && tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{ display: 'inline-block', marginBottom: '1rem' }}
            >
              <AlertCircle size={32} />
            </motion.div>
            <p>Loading your tasks...</p>
          </div>
        ) : (
          /* CSS Grid for Task Cards */
          <motion.div 
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}
          >
            <AnimatePresence>
              {displayTasks.map(todo => (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  whileHover={{ y: -5 }}
                  style={{
                    background: 'rgba(30, 41, 59, 0.7)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: `${getPriorityColor(todo.priority)}20`,
                        color: getPriorityColor(todo.priority),
                        border: `1px solid ${getPriorityColor(todo.priority)}40`
                      }}>
                        {todo.priority}
                      </span>
                      <button 
                        onClick={() => deleteTask(todo.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.7, padding: '0.25rem' }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                        onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      margin: '0 0 1rem 0',
                      fontWeight: 600,
                      color: todo.completed ? '#64748b' : '#f8fafc',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      transition: 'color 0.3s'
                    }}>
                      {todo.text}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.8rem' }}>
                      <Clock size={14} />
                      {formatDate(todo.createdAt)}
                    </div>
                    
                    <button 
                      onClick={() => toggleTask(todo.id)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        color: todo.completed ? '#10b981' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.3s, transform 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {!loading && displayTasks.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <p style={{ fontSize: '1.25rem' }}>You're all caught up!</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;


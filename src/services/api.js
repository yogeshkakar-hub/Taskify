// ─── Live API Service — connects to Express backend ─────────
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

const defaultOptions = {
  credentials: 'include',
};

const fetchApi = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Helper to map Mongoose documents to React expected shapes
const mapTodo = (todo) => {
  if (!todo) return null;
  return {
    id: todo._id,
    text: todo.title,
    completed: todo.completed,
    description: todo.description,
    priority: todo.priority || 'Medium',
    createdAt: todo.createdAt,
    user: todo.user,
  };
};

export const api = {
  auth: {
    login: (email, password) => 
      fetchApi('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    register: (name, email, password) => 
      fetchApi('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
    logout: () => 
      fetchApi('/auth/logout', { method: 'POST' }),
    getMe: () => 
      fetchApi('/auth/me', { method: 'GET' }),
  },
  todos: {
    getAll: async () => {
      const data = await fetchApi('/todos');
      return { status: 200, data: (data.data || []).map(mapTodo), message: 'Success' };
    },
    create: async (text, priority = 'Medium') => {
      if (!text.trim()) throw new Error('Todo text cannot be empty');
      const data = await fetchApi('/todos', {
        method: 'POST',
        body: JSON.stringify({ title: text, priority }),
      });
      return { status: 201, data: mapTodo(data.data), message: 'Success' };
    },
    toggle: async (id) => {
      // Fetch all to get current state (inefficient but mimics previous logic for simplicity)
      const all = await api.todos.getAll();
      const todo = all.data.find((t) => t.id === id);
      if (!todo) throw new Error('Todo not found');

      const data = await fetchApi(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !todo.completed }),
      });
      return { status: 200, data: mapTodo(data.data), message: 'Success' };
    },
    delete: async (id) => {
      const data = await fetchApi(`/todos/${id}`, { method: 'DELETE' });
      return { status: 200, data: data.data, message: 'Success' };
    },
  },
};

global.crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Initialize Express
const app = express();

// ─── Global Middleware ───────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'] : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ─── API Routes ──────────────────────────────────────────────
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// ─── Production Configuration & Static Hosting ───────────────
const distPath = path.join(__dirname, '../dist');

if (process.env.NODE_ENV === 'production') {
  // Serve static assets from build output
  app.use(express.static(distPath));

  // Direct any non-API route to index.html for Single Page App client routing
  app.get('*', (req, res, next) => {
    // Avoid capturing API routes that might be unmatched
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // ─── Health Check (Development/API Only mode) ──────────────
  app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'GTp2 Backend API is running in development mode 🚀' });
  });
}

// ─── Global Error Handler ────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('🔥 Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5050;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

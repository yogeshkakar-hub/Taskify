const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const todoRoutes = require('../routes/todoRoutes');

// Mock a simple Express application to test the todo endpoints isolation/unauthenticated error
const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

describe('Todo API Route Authentication Protection', () => {
  
  test('GET /api/todos should return 401 Unauthorized when no JWT is provided', async () => {
    const res = await request(app)
      .get('/api/todos')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/not authorized/i);
  });

  test('POST /api/todos should return 401 Unauthorized when no JWT is provided', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test Unauth Task' })
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toHaveProperty('success', false);
  });
});

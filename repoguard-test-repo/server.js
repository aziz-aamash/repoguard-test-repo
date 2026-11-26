const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const _ = require('lodash');

const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [] }));
app.use(express.json());

app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.get('/health', (req, res) => {
  res.json({ ok: true });
});



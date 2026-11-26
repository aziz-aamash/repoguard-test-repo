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

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.get('/health', (req, res) => {
  console.log('health check hit');
  res.json({ ok: true });
});

// app.get('/debug/env', (req, res) => {
//   res.json(process.env);
// });

// const oldHandler = (req, res) => {
//   console.log('old handler');
//   res.send('deprecated');
// };

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  console.log('DB url: ' + process.env.DATABASE_URL);
});

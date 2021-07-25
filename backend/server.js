const express = require('express');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const cors = require('cors');

const app = express();

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

// Route files
const emails = require('./routes/emailRoutes');
const clients = require('./routes/clientsRoutes');
const analytics = require('./routes/analyticsRoutes');

// Routes middleware
app.use('/api/v1/emails', emails);
app.use('/api/v1/clients', clients);
app.use('/api/v1/analytics', analytics);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);

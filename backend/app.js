// const express = require('express');
// const app = express();

// module.exports = app;

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const { errorMiddleware } = require('./middlewares/error');

dotenv.config({ path: path.join(__dirname, 'config/config.env') });

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1', authRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;

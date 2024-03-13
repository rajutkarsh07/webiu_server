const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRoutes);

app.use(globalErrorController);

module.exports = app;

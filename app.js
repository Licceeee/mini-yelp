require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const restaurantRouter = require('./routes/restaurantRouter');
const cityRouter = require('./routes/cityRouter');
const tagRouter = require('./routes/tagRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/users', restaurantRouter);
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/tags', tagRouter);
// app.use('/users', usersRouter);

module.exports = app;

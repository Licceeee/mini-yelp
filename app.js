require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken')
const restaurantRouter = require('./routes/restaurantRouter');
const cityRouter = require('./routes/cityRouter');
const tagRouter = require('./routes/tagRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const authRouter = require('./routes/authenticationRouter')
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/tags', tagRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/login',authRouter),
module.exports = app;

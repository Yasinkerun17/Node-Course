/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan')

const app = express();
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// create a check body middleware
// check if body contains the name and the price property
// if not, send back 400(bad request)

// 3)ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

const express = require('express');
const logger = require('morgan');
const { NotFound } = require('http-errors');
const { errors } = require('./routes');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/error-sim', errors);
app.get('/', (req, res) => res.send('A rich man is nothing but a poor man with money.'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(NotFound());
});

// error handler
app.use(function (err, req, res, next) {
  let code = (err !== undefined && err.statusCode !== undefined) ? err.statusCode : 500,
    msg = (err !== undefined && err.message !== undefined) ? err.message : 'Internal Server Error';
  const resData = {
    code: code,
    message: msg
  };
  console.log(JSON.stringify(err));
  if(err.info !== undefined) {
    Object.assign(resData, {info: err.info});
  }
  return res.status(code).json({
    error: resData
  });
});

module.exports = app;
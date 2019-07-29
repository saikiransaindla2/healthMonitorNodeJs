const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const indexRouter = require('./index');
const usersRouter = require('./users');
const manualRouter = require('./manual');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manual', manualRouter);

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');


module.exports = app;
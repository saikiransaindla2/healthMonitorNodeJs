const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const indexRouter = require('./index');
const searchRouter = require('./search');
const manualRouter = require('./manual');
const addRouter = require('./add');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/manual', manualRouter);
app.use('/add',addRouter);

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');


module.exports = app;
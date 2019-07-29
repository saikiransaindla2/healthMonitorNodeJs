var createError = require('http-errors');
const logger = require('morgan');

const reg = require('./reg.js').reg;
const sleep = require('./reg.js').sleep;
// const msg = require('./rand.js').msg;
// const sleep = require('./rand.js').sleep;


(async()=>{
  for(let i=0;;i++)
  {
    console.log("before call:",i);
    reg(i+1);
    console.log("after call:",i);
    await sleep(1000*60*2);
  }
})()

const app = require('./routes/routes.js');

app.use(logger('dev'));

//HANDLE ERRORS

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

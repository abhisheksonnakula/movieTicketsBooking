var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var theatreRouter = require('./routes/theatre');
var showRouter = require('./routes/show');
var bookingRouter = require('./routes/booking');

//connect to mongodb
mongoose
  .connect("mongodb+srv://abhishek:1234@cluster0.bvslq.mongodb.net/abhishek?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/theatre', theatreRouter);
app.use('/show', showRouter);
app.use('/booking', bookingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

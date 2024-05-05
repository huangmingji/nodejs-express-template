var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var setttings = require('./settings');

var app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const logger = require('./utils/logger');
if(setttings.logging.level === 'debug') {
    app.use(logger.accessLog);
    app.use(logger.accessLogErr);
    app.use(logger.logger('dev'));
} else if(setttings.logging.level === 'info') {
    app.use(logger.accessLog);
    app.use(logger.accessLogErr);
} else if (setttings.logging.level === 'error') {
    app.use(logger.accessLogErr);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes');
app.use('/', routes);

const GlobalExceptionHandler = require('./utils/exceptions/global-exception-handler');
app.use(GlobalExceptionHandler);

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

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var getProperty = require('./config');

var app = express();


var setViewEngine = function (expressApp) {
    // view engine setup
    expressApp.set('views', path.join(__dirname, viewsDirectory));
    expressApp.set('view engine', 'jade');
};

var addMiddlewares = function (expressApp) {
    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    expressApp.use(logger('dev'));
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: false}));
    expressApp.use(cookieParser());
    expressApp.use(require('stylus').middleware(path.join(__dirname, staticDirectory)));
    expressApp.use(express.static(path.join(__dirname, staticDirectory)));


};

var addRoutes = function (expressApp) {
    expressApp.use('/', routes);
    expressApp.use('/users', users);

    // catch 404 and forward to error handler
    expressApp.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (expressApp.get('env') === 'development') {
        expressApp.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    expressApp.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};

var viewsDirectory = getProperty('frontend.viewsDirectory', '../frontend/views');
var staticDirectory = getProperty('frontend.staticDirectory', '../frontend/public');

if (typeof viewsDirectory !== 'string') {
    console.warn('The views directory is not correct');
    process.exit();
}

if (typeof staticDirectory !== 'string') {
    console.warn('Static directories are not correctly configured');
    process.exit();
}

try {
    setViewEngine(app);
    addMiddlewares(app);
    addRoutes(app);
}catch(e) {
    console.error(e);
}

module.exports = app;

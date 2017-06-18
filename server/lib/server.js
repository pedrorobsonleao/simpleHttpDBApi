
var config = require('../etc/config');

var debug = require('debug')('httpd-lib');

var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var app = express();

if(config.hasCORS) {
    app.use(cors());
}

app.use(logger('combined'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(compression());

config.HTDOCS.forEach(function(htdocs) {
    var _path = path.join(__dirname,htdocs.dir);
    debug('bind static uri:' + htdocs.uri + '\t dir:' + _path);
    app.use(htdocs.uri, express.static(_path));
});

// Make our db accessible to our router
app.use(function(req, res, next) {
    next();
});

config.URL.forEach(function(url) {
    debug('bind service uri:' + url.uri + '\t module:' + url.module);
    app.use(url.uri, require(url.module));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        .send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .send({
        message: err.message,
        error: {}
    });
});

module.exports = app;

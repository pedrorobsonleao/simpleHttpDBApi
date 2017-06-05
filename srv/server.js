var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var debug = require('debug')('server'); //debug - to use set im prompt: DEBUG=crud node ./bin/wwww

var app = express();

app.use(cors());
app.use(logger('combined'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(compression());
app.use(express.static(path.join(__dirname, 'www')));

// Make our db accessible to our router
app.use(function(req,res,next){
    next();
});

// a url router ...
app.use('/sample_crud1', require('../srv/routers/mongocrud'));
app.use('/sample_crud2', require('../srv/routers/mongocrud'));

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
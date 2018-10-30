var express = require('express');
var logger = require('./logger');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var bluebird = require('bluebird');
asyncHandler = require('express-async-handler');


module.exports = function (app, config) {

    logger.log('info', "Loading Mongoose functionality");

    mongoose.Promise = bluebird;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });

    app.use(function (req, res, next) {
        logger.log('info', 'Request from ' + req.connection.remoteAddress);
        next();
    });

    app.use(morgan('dev'));

    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
        logger.log('info', 'Mongoose connected to the database');
    });


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));


    app.use(express.static(config.root + '/public'));

    require('../app/models/todos');
    require('../app/controllers/todos')(app, config);
   
    app.use(function (req, res) {
        logger.log('error', 'File not found');
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found, Request Error');
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Server Error');
    });

    logger.log('info', "Starting application");

};
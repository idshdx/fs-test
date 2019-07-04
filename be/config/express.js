const express = require('express'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config')[env],
    methodOverride = require('method-override'),
    cors = require('cors'),
    morgan = require('morgan');

module.exports = function (app) {
    app.use(express.static(config.rootPath + '/public'));
    app.use(cors());
    app.use(compress());
    app.use(methodOverride());
    app.use(bodyParser());
    //app.use(morgan('dev'));
};

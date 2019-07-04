const env = process.env.NODE_ENV || 'development',
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose'),
    router = require('express').Router();

module.exports = function (app) {

    app.use(require('./routes'));

    app.use(function (err, req, res, next) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({
                errors: Object.keys(err.errors).reduce(function (errors, key) {
                    errors[key] = err.errors[key].message;

                    return errors;
                }, {})
            });
        }

        return next(err);
    });

    const isProduction = env === 'production';

    /// error handlers

    if (!isProduction) {
        app.use(errorhandler());
        mongoose.set('debug', true);
    }

    // development error handler
    // will print stacktrace
    if (!isProduction) {
        app.use(function (err, req, res, next) {
            console.log(err.stack);

            res.status(err.status || 500);

            res.json({
                'errors': {
                    message: err.message,
                    error: err
                }
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: {}
            }
        });
    });
};

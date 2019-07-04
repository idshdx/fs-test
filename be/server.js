const express = require('express'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    mongoose = require('mongoose');


// Bootstrap database
mongoose.connect(config.db, {useNewUrlParser: true});

// Configure server
const app = express();
require('./config/express')(app);
require('./config/swagger')(app);
require('./config/routes')(app);
// require('./config/error-handlers')(app);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

var isProduction = process.env.NODE_ENV === 'production';

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function(err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({'errors': {
                message: err.message,
                error: err
            }});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
            message: err.message,
            error: {}
        }});
});

// Start listening
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Application started on port ' + port);

module.exports = app;

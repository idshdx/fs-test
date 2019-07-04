const env = process.env.NODE_ENV || 'development',
    config = require('./config')[env];

module.exports = function (app) {
    /**
     * @swagger
     * /:
     *   get:
     *     description: Returns the static page which bootstraps VueJs
     *     responses:
     *       200:
     *         description: get the UI
     */
    //=============================
    // Static
    //=============================
    app.get('/', function (req, res) {
        res.sendfile('/index.html', {root: config.rootPath});
    });

    //=============================
    // Client
    //=============================
    const client = require('../app/controllers/clients');
    app.use(client.router);

    //=============================
    // Providers
    //=============================
    const provider = require('../app/controllers/providers');
    app.use(provider);

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
};

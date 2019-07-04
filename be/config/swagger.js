const routes = require('./routes'),
    swaggerJSDoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express');

module.exports = function (app) {
    const swaggerDefinition = {
        info: {
            title: 'BE Clients&Providers',
            version: '1.0.0',
            description: 'A client and providers API',
        },
        host: `localhost:${process.env.PORT || 3000}`,
        basePath: '/',
    };

    const options = {
        explorer: true,
        swaggerDefinition,
        apis: ['./app/controllers/providers.js', './app/controllers/clients.js', './config/routes.js'],
    };
    const swaggerSpec = swaggerJSDoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

};




const router = require('express').Router(),
    mongoose = require('mongoose'),
    Client = require('../models/client'),
    Provider = require('../models/provider'),
    excludeFields = {'_id': false, '__v': false}; // this one is faster than invoking the function below. Used in most cases.
    // Yeah, this should be part of a 'helper' namespace and exported from there

function removeFields(mongoObject) {
    mongoObject.set('_id', undefined, {strict: false} );
    mongoObject.set('__v', undefined, {strict: false} );

    return mongoObject;
}

// Looks like its a swaggerdocs bug when using 'allOf'

/**
 * @swagger
 *
 * definitions:
 *   NewClient:
 *     type: object
 *     required:
 *       - name
 *       - email
 *       - phone
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *       email:
 *         type: string
 *         required: true
 *       phone:
 *         type: number
 *         required: true
 *       providers:
 *         type: array
 *         items:
 *           type: integer
 *         required: false
 *         description: array of provider ids
 *   Client:
 *     allOf:
 *       - $ref: '#/definitions/NewClient'
 *       - type: object
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: string
 */

/**
 * @swagger
 * /client:
 *   get:
 *     tags:
 *      - Client
 *     description: Returns paginated clients
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: returns paginated clients
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Clients'
 */

router.get('/client', function (req, res, next) {
    // todo: move to a config for better modularization
    let query = {};
    let limit = 20;
    let offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    return Promise.all([
        Client.find({}, excludeFields)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({createdAt: 'desc'})
            .populate('providers', 'id')
            .exec(),
        Client.count(query).exec(),
    ]).then(function (results) {
        const clients = results[0];
        const clientsCount = results[1];

        return res.json({
            clients: clients,
            clientsCount: clientsCount
        });
    }).catch(next);
});

/**
 * @swagger
 *
 * /client:
 *   post:
 *     tags:
 *      - Client
 *     description: Creates a new client
 *     produces:
 *       - application/json
 *     parameters:
 *       - provider: Client
 *         description: Client object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewClient'
 *     responses:
 *       200:
 *         description: creates a new client
 *         schema:
 *           $ref: '#/definitions/Client'
 */
router.post('/client', function (req, res, next) {
    if (!req.body.client) return res.sendStatus(400);

    const client = new Client(req.body.client);

    client.save().then(function (client) {
        client = removeFields(client);

        return res.json({client: client});

    }).catch(next);
});

/**
 * @swagger
 *
 * /client/id:
 *   get:
 *     tags:
 *      - Client
 *     description: Shows a client
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: string
 *         description: ID of the provider
 *         in:  param
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: shows the client
 *         schema:
 *           $ref: '#/definitions/Client'
 */
router.get('/client/:id', function (req, res, next) {
    const id = req.params.id;

    Client.findById(id, excludeFields).populate('providers', 'name')
        .then(function (client) {
            if (!client) return res.sendStatus(400);

            return res.json({client: client});

        }).catch(next);
});

/**
 * @swagger
 *
 * /client/id:
 *   put:
 *     tags:
 *      - Client
 *     description: Updates a client
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: string
 *         description: ID of the client
 *         in:  param
 *         required: true
 *         type: number
 *       - client: client
 *         description: Client object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewClient'
 *     responses:
 *       200:
 *         description: returns the updated Client
 *         schema:
 *           $ref: '#/definitions/Client'
 */
router.put('/client/:id', function (req, res, next) {
    const id = req.params.id;

    Client.findOneAndUpdate({id: id}, req.body.client, {new: true})
        .then(function (client) {
            if (!client) return res.sendStatus(400);

            client = removeFields(client);

            return res.json({client: client});

        }).catch(next);
});
/**
 * @swagger
 *
 * /client/id:
 *   delete:
 *     tags:
 *      - Client
 *     description: Deletes a client
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: string
 *         description: ID of the client to be deleted
 *         in:  param
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: client deleted
 *         schema:
 *           $ref: '#/definitions/Client'
 */
router.delete('/client/:id', function (req, res, next) {
    const id = req.params.id;

    Client.findById({id: id}).then(function (client) {
        if (!client)  return res.sendStatus(400);

        return client.delete().then(function () {
            return res.send(200);
        })

    }).catch(next);

});

module.exports = {
    router,
    removeFields // todo: 'helper' namespace
};

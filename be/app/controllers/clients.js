const router = require('express').Router(),
    mongoose = require('mongoose'),
    Client = require('../models/client'),
    Provider = require('../models/provider');

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
        Client.find()
            .limit(Number(limit))
            .skip(Number(offset))
            .populate('providers')
            .exec(),
        Client.countDocuments(query).exec(),
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

    Client.findById(id).populate('providers')
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

    if (!req.body.client) return res.sendStatus(400);

    Client.findOneAndUpdate({_id: id}, req.body.client, {new: true})
        .then(function (client) {
            if (!client) return res.sendStatus(400);

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

    Client.findById({_id: id}).then(function (client) {
        if (!client)  return res.sendStatus(400);

        return client.delete().then(function () {
            return res.send(200);
        })

    }).catch(next);

});

module.exports = router;

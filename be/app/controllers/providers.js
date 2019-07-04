const router = require('express').Router(),
    mongoose = require('mongoose'),
    Provider = require('../models/provider');


// Looks like its a swagger jsdocs bug when using 'allOf'...

/**
 * @swagger
 *
 *
 * definitions:
 *   NewProvider:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *   Provider:
 *     allOf:
 *       - $ref: '#/definitions/NewProvider'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: string
 */

/**
 * @swagger
 * /provider:
 *   get:
 *     tags:
 *      - Provider
 *     description: Returns providers
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: returns paginated providers
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Provider'
 */
router.get('/provider', function (req, res, next) {
    // todo: move to a config
    let query = {};
    let limit = 20;
    let offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    Promise.all([
        Provider.find()
            .limit(Number(limit))
            .skip(Number(offset))
            .exec(),
        Provider.count(query).exec(),
    ]).then(function (results) {
        const providers = results[0];
        const providersCount = results[1];

        return res.json({
            providers: providers,
            providersCount: providersCount
        });
    }).catch(next);
});

/**
 * @swagger
 *
 * /provider:
 *   post:
 *     tags:
 *      - Provider
 *     description: Creates a provider
 *     produces:
 *       - application/json
 *     parameters:
 *       - provider: Provider
 *         description: Provider object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewProvider'
 *     responses:
 *       200:
 *         description: creates a provider
 *         schema:
 *           $ref: '#/definitions/Provider'
 */
router.post('/provider', function (req, res, next) {
    if (!req.body.provider) return res.sendStatus(400);

    const provider = new Provider(req.body.provider);

    return provider.save().then(function (provider) {

        return res.json({provider: provider});

    }).catch(next);
});

/**
 * @swagger
 *
 * /provider/id:
 *   get:
 *     tags:
 *      - Provider
 *     description: Shows a provider
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
 *         description: shows the provider
 *         schema:
 *           $ref: '#/definitions/Provider'
 */
router.get('/provider/:id', function (req, res, next) {
    const id = req.params.id;

    Provider.findById(id)
        .then(function (provider) {
            if (!provider)  return res.sendStatus(400);

            return res.json({provider: provider});

        }).catch(next);
});

/**
 * @swagger
 *
 * /provider/id:
 *   put:
 *     tags:
 *      - Provider
 *     description: Updates a provider
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: string
 *         description: ID of the provider
 *         in:  param
 *         required: true
 *         type: number
 *       - provider: provider
 *         description: Provider object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewProvider'
 *     responses:
 *       200:
 *         description: returns the updated Provider
 *         schema:
 *           $ref: '#/definitions/Provider'
 */
router.put('/provider/:id', function (req, res, next) {
    const id = req.params.id;

    Provider.findOneAndUpdate({_id: id}, req.body.provider, {new: true})
        .then(function (provider) {
            if (!provider) return res.sendStatus(400);

            return res.json({provider: provider});

        }).catch(next);
});

/**
 * @swagger
 *
 * /provider/id:
 *   delete:
 *     tags:
 *      - Provider
 *     description: Deletes a provider
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: string
 *         description: ID of the provider to be deleted
 *         in:  param
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: provider deleted
 *         schema:
 *           $ref: '#/definitions/Provider'
 */
router.delete('/provider/:id', function (req, res, next) {
    const id = req.params.id;

    Provider.findById({id: id}).then(function (provider) {
        if (!provider) return res.sendStatus(400);

        return provider.delete().then(function () {
            return res.send(200);
        })

    }).catch(next);
});

module.exports = router;

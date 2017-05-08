'use strict';

let express = require('express'),
    router = express.Router(),
    EndpointManager = require('../manager/EndpointManager'),
    endpointManager = new EndpointManager();

router.get('/',
    function (req, res) {
        endpointManager.getAll()
            .then(endpoints => res.status(200).send(endpoints))
            .catch((err) => res.status(err.status || 400).send(err));

    });

router.post('/',
    function (req, res) {
        let chip = req.body;

        endpointManager.add(Object.assign(chip, {ip: req.connection.remoteAddress}))
            .then(() => res.status(204).send())
            .catch((err) => res.status(err.status || 400).send(err));
    });

module.exports = router;
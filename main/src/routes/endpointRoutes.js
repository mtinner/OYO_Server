'use strict';

let express = require('express'),
    router = express.Router(),
    EndpointManager = require('../manager/EndpointManager'),
    Endpoint = require('../entity/Endpoint'),
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

        endpointManager.add(new Endpoint(chip.chipId, req.connection.remoteAddress, chip.inputPins, chip.outputPins))
            .then(() => res.status(204).send())
            .catch((err) => res.status(err.status || 400).send(err));
    });

module.exports = router;
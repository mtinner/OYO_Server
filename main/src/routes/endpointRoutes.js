'use strict';

let express = require('express'),
    router = express.Router(),
    endpointManager = require('../manager/EndpointManager'),
    Endpoint = require('../entity/Endpoint');

router.get('/',
    function (req, res) {
        res.status(200).send(endpointManager.getAll());
    });

router.post('/',
    function (req, res) {
        let chip = req.body;
        endpointManager.add(new Endpoint(chip.chipId, req.connection.remoteAddress, chip.inputPins, chip.outputPins));
        res.status(204).send();
    });

module.exports = router;
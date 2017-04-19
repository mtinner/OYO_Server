'use strict';

let express = require('express'),
    router = express.Router(),
    endpointManager = require('../manager/EndpointManager');

router.get('/',
    function (req, res) {
        res.status(200).send(endpointManager.getAll());
    });

module.exports = router;
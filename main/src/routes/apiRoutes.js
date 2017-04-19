'use strict';
let express = require('express'),
    router = express.Router();

let endpointRoutes = require('./endpointRoutes');

router.use('/endpoints', endpointRoutes);

module.exports = router;
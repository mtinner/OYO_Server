'use strict';

module.exports = (function () {

    return {start: start};
    function start() {
        let express = require('express'),
            bodyParser = require('body-parser'),
            app = module.exports.app = exports.app = express(),
            compression = require('compression'),
            apiRouting = require('./routes/apiRoutes'),
            constants = require('./common/constants');

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(compression());

        app.use('/api', apiRouting);

        let port = constants.SERVER_PORT;
        app.listen(port);
        console.log('API listening on port ' + port + ' ...');
    }
})();


'use strict';

module.exports = (function () {

    return {start: start};
    function start() {
        let express = require('express'),
            bodyParser = require('body-parser'),
            app = express(),
            apiRouting = require('./routes/apiRoutes'),
            constants = require('./common/constants'),
            WebSocket = require('ws'),
            http = require('http'),
            eventBus = require('./service/EventBus');

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        app.use('/api', apiRouting);

        const server = http.createServer(app);
        const wss = new WebSocket.Server({server});

        wss.on('connection', function connection(ws) {
            console.log('new Connection on Server');
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });

            eventBus.observe(constants.INPUT_CHANGE, (data) => ws.send(JSON.stringify(data)));

        });


        let port = constants.SERVER_PORT;
        server.listen(port);
        console.log('API listening on port ' + port + ' ...');
    }
})();


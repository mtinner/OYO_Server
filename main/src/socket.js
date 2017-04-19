'use strict';

module.exports = (function () {
    let constants = require('./common/constants'),
        endpointManager = require('./manager/EndpointManager');
    return {start: start};
    function start() {

        var WebSocketServer = require('websocket').server;
        var http = require('http');

        var server = http.createServer(function (request, response) {
            console.log((new Date()) + ' Received request for ' + request.url);
            response.writeHead(404);
            response.end();
        });
        server.listen(constants.SOCKET_ENDPOINT_PORT, function () {
            console.log(`${(new Date())} Server is listening on port ${constants.SOCKET_ENDPOINT_PORT}`);
        });

        let wsServer = new WebSocketServer({
            httpServer: server,
            autoAcceptConnections: false
        });

        function originIsAllowed(origin) {
            // put logic here to detect whether the specified origin is allowed.
            return true;
        }

        wsServer.on('request', function (request) {
            if (!originIsAllowed(request.origin)) {
                // Make sure we only accept requests from an allowed origin
                request.reject();
                console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
                return;
            }

            var connection = request.accept('', request.origin);
            console.log((new Date()) + ' Connection accepted.');
            connection.on('message', function (message) {
                if (message.type === 'utf8') {
                    console.log('Received Message: ' + message.utf8Data);
                    connection.sendUTF(message.utf8Data);
                    let chip = JSON.parse(message.utf8Data);
                    endpointManager.add(chip.chipId, connection.socket.remoteAddress);
                }
            });
            connection.on('close', function (reasonCode, description) {
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            });
        });
    }
})();
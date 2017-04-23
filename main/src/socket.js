'use strict';
let WebSocket = require('ws');

module.exports = (function () {
    let constants = require('./common/constants'),
        endpointManager = require('./manager/EndpointManager');
    return {start: start};
    function start() {

        const wss = new WebSocket.Server({port: constants.SOCKET_ENDPOINT_PORT});
        wss.on('connection', function connection(ws) {
            ws._socket.setKeepAlive(true);
            console.log((new Date()) + ' Connection accepted.');
            endpointManager.update({chipId: getChipId(ws), active: true});

            ws.on('message', function incoming(message) {
                console.log('Received Message: ' + message);
                let input = JSON.parse(message);
                endpointManager.addInput(Object.assign({}, input, {chipId: getChipId(ws)}))
            });

            ws.on('close', function () {
                console.log((new Date()) + ' Peer ' + ws.remoteAddress + ' close ws.');
                endpointManager.update({chipId: getChipId(ws), active: false});
            });
        });

        function getChipId(websocket) {
            return parseInt(websocket.upgradeReq.headers['x-chipid'])
        }
    }
})();
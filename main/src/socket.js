'use strict';
let WebSocket = require('ws');

module.exports = (function () {
    let constants = require('./common/constants'),
        EndpointManager = require('./manager/EndpointManager'),
        eventBus = require('./service/EventBus'),
        endpointManager = new EndpointManager();

    return {start: start};
    function start() {

        const wss = new WebSocket.Server({port: constants.SOCKET_ENDPOINT_PORT});
        wss.on('connection', function connection(ws) {
            ws._socket.setKeepAlive(true);
            console.log((new Date()) + ' Connection accepted.');
            endpointManager.update({chipId: getChipId(ws), active: true});

            ws.on('message', function incoming(message) {
                console.log('Received Message: ' + message);
                let messageObj = JSON.parse(message);
                if (messageObj.event === constants.EVENTS.CHANGE) {
                    endpointManager.updateIOs({ios: [messageObj],chipId: getChipId(ws)});
                    eventBus.emit(constants.INPUT_CHANGE, Object.assign({}, messageObj, {chipId: getChipId(ws)}));
                }
                else if (messageObj.event === constants.EVENTS.INITIAL) {
                    endpointManager.updateIOs(Object.assign({}, messageObj, {chipId: getChipId(ws)}))
                }
            });

            ws.on('close', function () {
                console.log((new Date()) + ' Peer ' + ws.remoteAddress + ' close ws.');
                endpointManager.update({chipId: getChipId(ws), active: false});
            });
        });

        function getChipId(websocket) {
            return parseInt(websocket.upgradeReq.headers['chip-id'])
        }
    }
})();
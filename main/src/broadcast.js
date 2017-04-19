module.exports = (function () {

    return {start: start};

    function start() {
        let dgram = require('dgram'),
            server = dgram.createSocket("udp4"),
            constants = require('./common/constants');

        server.bind(function () {
            server.setBroadcast(true);
            setInterval(broadcastNew, 5000);
        });

        function broadcastNew() {
            var message = new Buffer("Hello OYO!");
            server.send(message, 0, message.length, constants.BROADCAST_PORT, constants.BROADCAST_ADDRESS, function () {
                console.log("Sent '" + message + "'");
            });
        }
    }
})();
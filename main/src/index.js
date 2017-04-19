let broadcast = require('./broadcast'),
    socket = require('./socket'),
    server = require('./server');

broadcast.start();
socket.start();
server.start();



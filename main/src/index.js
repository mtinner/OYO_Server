let broadcast = require('./broadcast'),
    socket = require('./socket'),
    server = require('./server');

server.start();
socket.start();
broadcast.start();



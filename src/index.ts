import {Socket} from './socket';
import {Broadcast} from './Broadcast';
import {Server} from './server';
{
    let socket = new Socket(),
        broadcast = new Broadcast(),
        server = new Server();
    socket.start();
    broadcast.start();
    server.start();

    //TODO set all inactive on startup
}
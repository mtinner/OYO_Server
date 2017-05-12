import {CONSTANTS} from './common/Constants';
import {createSocket} from "dgram";

export class Broadcast {
    private server;

    constructor() {
        this.server = createSocket('udp4')
    }

    start() {
        this.server.bind(() => {
            this.server.setBroadcast(true);
            setInterval(broadcastNew, 5000);
        });

        let broadcastNew = () => {
            var message = new Buffer("Hello OYO!");
            this.server.send(message, 0, message.length, CONSTANTS.BROADCAST_PORT, CONSTANTS.BROADCAST_ADDRESS, function () {
                console.log("Sent '" + message + "'");
            });
        }
    }
}
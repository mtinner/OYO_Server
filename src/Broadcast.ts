import {createSocket} from "dgram";
import {constants} from './common/constants';

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
			this.server.send(message, 0, message.length, constants.BROADCAST_PORT, constants.BROADCAST_ADDRESS, function () {
				console.log("Sent '" + message + "'");
			});
		}
	}
}
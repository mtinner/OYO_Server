import {constants} from "./common/constants";
import {EventBus} from './service/EventBus';
import WebSocket from 'ws';
import {EndpointManager} from './manager/EndpointManager';
import {EndpointService} from './service/EndpointService';
import {getIOId, IO} from './entity/IO';


export class Socket {
	private eventBus: EventBus;
	private endpointManager: EndpointManager;

	constructor() {
		this.eventBus = EventBus.getInstance();
		this.endpointManager = new EndpointManager(new EndpointService());
	}

	start(): void {
		this.endpointManager.setAllInactive();
		const wss = new WebSocket.Server({port: constants.SOCKET_ENDPOINT_PORT});
		wss.on('connection', (ws: OYOWebSocket) => {
			ws._socket.setKeepAlive(true);
			console.log((new Date()) + ' Connection accepted.');
			this.endpointManager.update({chipId: this.getChipId(ws), active: true});

			ws.on('message', (message) => {
				console.log('Received Message: ' + message);
				let messageObj = JSON.parse(message);
				if (messageObj.event === constants.EVENTS.CHANGE) {
					const changeObject = {
						inputLevel: messageObj.inputLevel,
						chipId: this.getChipId(ws),
						id: getIOId(this.getChipId(ws), messageObj.inputPin),
						activated: true
					};
					this.endpointManager.update(changeObject)
						.then((io: IO) => this.eventBus.emit(constants.INPUT_CHANGE, io));
				}
				else if (messageObj.event === constants.EVENTS.INITIAL) {
					this.endpointManager.setStatus({chipId: this.getChipId(ws)}, constants.LEVEL.UP, messageObj.ios);
				}
			});

			ws.on('close', () => {
				this.endpointManager.setStatus({chipId: this.getChipId(ws)}, constants.LEVEL.DOWN);
			});
		});
	}

	getChipId(websocket): number {
		return parseInt(websocket.upgradeReq.headers['chip-id'])
	}
}

declare class OYOWebSocket extends WebSocket {
	_socket: OYOSocket;

	remoteAddress: string;

	on(name: string, cb?)
}

declare class OYOSocket {
	setKeepAlive(bool: boolean): void;
}
import {CONSTANTS} from "./common/constants";
import {EventBus} from './service/EventBus';
import WebSocket from 'ws';
import {EndpointManager} from './manager/EndpointManager';
import {EndpointService} from './service/EndpointService';


export class Socket {
    private eventBus: EventBus;
    private endpointManager: EndpointManager;

    constructor() {
        this.eventBus = EventBus.getInstance();
        this.endpointManager = new EndpointManager(new EndpointService());
    }

    start() {
        const wss = new WebSocket.Server({port: CONSTANTS.SOCKET_ENDPOINT_PORT});
        wss.on('connection', (ws: OYOWebSocket) => {
            ws._socket.setKeepAlive(true);
            console.log((new Date()) + ' Connection accepted.');
            this.endpointManager.update({chipId: this.getChipId(ws), active: true});

            ws.on('message', (message) => {
                console.log('Received Message: ' + message);
                let messageObj = JSON.parse(message);
                if (messageObj.event === CONSTANTS.EVENTS.CHANGE) {
                    this.endpointManager.updateIOs({ios: [messageObj], chipId: this.getChipId(ws)});
                    this.eventBus.emit(CONSTANTS.INPUT_CHANGE, Object.assign({}, messageObj, {chipId: this.getChipId(ws)}));
                }
                else if (messageObj.event === CONSTANTS.EVENTS.INITIAL) {
                    this.endpointManager.updateIOs(Object.assign({}, messageObj, {chipId: this.getChipId(ws)}))
                }
            });

            ws.on('close', () => {
                console.log((new Date()) + ' Peer ' + ws.remoteAddress + ' close ws.');
                this.endpointManager.update({chipId: this.getChipId(ws), active: false});
            });
        });
    }

    getChipId(websocket) {
        return parseInt(websocket.upgradeReq.headers['chip-id'])
    }
}

declare class OYOWebSocket extends WebSocket {
    _socket: OYOSocket;

    remoteAddress(): string;

    on(name: string, cb?)
}

declare class OYOSocket {
    setKeepAlive(bool: boolean): void;
}
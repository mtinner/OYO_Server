'use strict';
import bodyParser from 'body-parser'
import * as express from "express";

import WebSocket  from 'ws';
import http from 'http';
import {CONSTANTS} from './common/Constants';
import {EventBus} from './service/EventBus';
import {ApiRoutes} from './routes/ApiRoutes';


export class Server {
    private eventBus: EventBus;
    private app = express();
    private apiRoutes;

    constructor() {
        this.eventBus = EventBus.getInstance();
        this.apiRoutes = new ApiRoutes();
    }

    start() {

        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());

        this.app.use('/api', this.apiRoutes.getRoutes());


        const server = http.createServer(this.app);
        const wss = new WebSocket.Server({server});

        wss.on('connection', (ws) => {
            console.log('new Connection on Server');
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });

            this.eventBus.observe(CONSTANTS.INPUT_CHANGE, (data) => ws.send(JSON.stringify(data)));

        });


        let port = CONSTANTS.SERVER_PORT;
        server.listen(port);
        console.log('API listening on port ' + port + ' ...');
    }
}


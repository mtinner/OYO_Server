import * as express from "express";
import {EndpointManager} from '../manager/EndpointManager';
import {EndpointService} from '../service/EndpointService';
import {RequestHandler, Router} from 'express-serve-static-core';
import {IRoutes} from './IRoutes';
import {IOutput} from '../entity/IOutput';


export class EndpointRoutes implements IRoutes {
    private router: Router;
    private endpointManager: EndpointManager;

    constructor() {
        this.router = express.Router();
        this.endpointManager = new EndpointManager(new EndpointService());
    }

    getRoutes(): RequestHandler[] {
        return [
            this.router.get('/',
                (req, res) => {
                    this.endpointManager.getAll()
                        .then(endpoints => res.status(200).send(endpoints))
                        .catch((err) => res.status(err.status || 400).send(err));

                }),
            this.router.post('/',
                (req, res) => {
                    let chip = req.body;
                    let ipv4 = req.connection.remoteAddress.replace(/^.*:/, '');
                    this.endpointManager.add(Object.assign(chip, {ip: ipv4}))
                        .then(() => res.status(204).send())
                        .catch((err) => res.status(err.status || 400).send(err));
                }),
            this.router.post('/:chipId',
                (req, res) => {
                    let output: IOutput = {chipId: parseInt(req.params.chipId), ...req.body};
                    this.endpointManager.changeEndpoint(output)
                        .then(() => res.status(204).send())
                        .catch((err) => res.status(err.status || 400).send(err));
                })
        ]
    }
}

import * as express from 'express';
import {EndpointManager} from '../manager/EndpointManager';
import {EndpointService} from '../service/EndpointService';
import {RequestHandler, Router} from 'express-serve-static-core';
import {IRoutes} from './IRoutes';
import {Endpoint} from '../entity/Endpoint';


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
			this.router.get('/:chipId',
				(req, res) => {
					this.endpointManager.get(parseInt(req.params.id))
						.then((endpoint) => res.status(200).send(endpoint))
						.catch((err) => res.status(err.status || 400).send(err));
				}),
			this.router.post('/:chipId',
				(req, res) => {
					let endpoint: Endpoint = {chipId: parseInt(req.params.id), ...req.body};
					this.endpointManager.update(endpoint)
						.then((endpoint) => res.status(200).send(endpoint))
						.catch((err) => res.status(err.status || 400).send(err));
				})
		]
	}
}

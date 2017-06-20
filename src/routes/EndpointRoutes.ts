import * as express from 'express';
import { EndpointManager } from '../manager/EndpointManager';
import { EndpointService } from '../service/EndpointService';
import { RequestHandler, Router } from 'express-serve-static-core';
import { IRoutes } from './IRoutes';
import { IO } from '../entity/IO';


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
					this.endpointManager.getAll(req.query)
						.then(endpoints => res.status(200).send(endpoints))
						.catch((err) => res.status(err.status || 400).send(err));

				}),
			this.router.post('/',
				(req, res) => {
					let chip = req.body;
					let ipv4 = req.connection.remoteAddress.replace(/^.*:/, '');
					this.endpointManager.add(Object.assign(chip, { ip: ipv4 }))
						.then(() => res.status(204).send())
						.catch((err) => res.status(err.status || 400).send(err));
				}),
			this.router.put('/:id',
				(req, res) => {
					let io: IO = { id: req.params.id, ...req.body };
					this.endpointManager.update(io)
						.then((updatedIO) => res.status(200).send(updatedIO))
						.catch((err) => res.status(err.status || 400).send(err));
				}),
			this.router.post('/:id/switch',
				(req, res) => {
					this.endpointManager.switchOutput(req.params.id)
						.then(() => res.status(204).send())
						.catch((err) => res.status(err.status || 400).send(err));
				}),
			this.router.post('/off',
				(req, res) => {
					this.endpointManager.switchOff()
						.then(() => res.status(204).send())
						.catch((err) => res.status(err.status || 400).send(err));
				})
		]
	}
}

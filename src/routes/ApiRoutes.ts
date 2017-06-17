import * as express from "express";
import {RequestHandler} from 'express-serve-static-core';
import {EndpointRoutes} from './EndpointRoutes';
import {Router} from 'express';
import {IRoutes} from './IRoutes';


export class ApiRoutes implements IRoutes {
	private router: Router;
	private endpointRoutes: EndpointRoutes;

	constructor() {
		this.router = express.Router();
		this.endpointRoutes = new EndpointRoutes();
	}

	getRoutes(): RequestHandler[] {
		return [
			this.router.use(this.nocache),
			this.router.use('/endpoints', this.endpointRoutes.getRoutes())
		]
	}

	nocache(req, res, next) {
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');
		next();
	}
}

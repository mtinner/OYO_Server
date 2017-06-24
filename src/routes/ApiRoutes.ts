import * as express from "express";
import {RequestHandler} from 'express-serve-static-core';
import {EndpointRoutes} from './EndpointRoutes';
import {Router} from 'express';
import {IRoutes} from './IRoutes';
import {intQueryParser, nocache, boolQueryParser} from '../common/middleware';


export class ApiRoutes implements IRoutes {
	private router: Router;
	private endpointRoutes: EndpointRoutes;

	constructor() {
		this.router = express.Router();
		this.endpointRoutes = new EndpointRoutes();
	}

	getRoutes(): RequestHandler[] {
		return [
			this.router.use(nocache),
			this.router.use(intQueryParser),
			this.router.use(boolQueryParser),
			this.router.use('/endpoints', this.endpointRoutes.getRoutes())
		]
	}
}

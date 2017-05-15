'use strict';
import {BaseService} from './BaseService';
import {Repository} from '../db/Repository';
import {Endpoint} from '../entity/Endpoint';


export class EndpointService extends BaseService<Endpoint> {

    constructor() {
        super(new Repository('endpoint'));
    }
}
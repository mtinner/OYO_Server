'use strict';
import { BaseService } from './BaseService';
import { Repository } from '../db/Repository';
import { IO } from '../entity/IO';


export class EndpointService extends BaseService<IO> {

    constructor() {
        super(new Repository('endpoint'));
    }
}
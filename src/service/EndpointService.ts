'use strict';
import {BaseService} from './BaseService';
import {Repository} from '../db/Repository';


export class EndpointService extends BaseService {

    constructor() {
        super(new Repository('endpoint'));
    }
}
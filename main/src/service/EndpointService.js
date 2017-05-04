'use strict';
let Repository = require('../db/Repository'),
    BaseService = require('./BaseService');

class EndpointService extends BaseService {

    constructor() {
        super(new Repository('endpoint'));
    }
}

module.exports = EndpointService;

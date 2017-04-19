'use strict';
let Endpoint = require('../entity/Endpoint');

class EndpointService {

    constructor() {
        this.endpoints = [];
    }

    add(chipId, ip) {
        if (!this.endpoints.some(endpoint => endpoint.chipId === chipId)) {
            this.endpoints.push(new Endpoint(chipId, ip))
        }
        return this.endpoints;
    }

    getAll() {
        return this.endpoints;
    }
}

module.exports = new EndpointService();

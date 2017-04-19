'use strict';

let EndpointService = require('../service/EndpointService');


class EndpointManager {

    constructor() {
        this.endpointService = EndpointService
    }

    getAll() {
        return this.endpointService.getAll();
    }

    add(chipId, ip) {
        return this.endpointService.add(chipId, ip);
    }

    remove(ip) {
        return this.endpointService.remove(ip);
    }
}

module.exports = new EndpointManager();
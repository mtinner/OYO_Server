'use strict';

let EndpointService = require('../service/EndpointService');


class EndpointManager {

    constructor() {
        this.endpointService = EndpointService
    }

    getAll() {
        return this.endpointService.getAll();
    }

    add(obj) {
        return this.endpointService.add(obj);
    }

    update(obj) {
        return this.endpointService.update(obj);
    }

    addInput(obj) {
        let endpoint = this.endpointService.get(obj.chipId);
        let index = endpoint.inputPins.findIndex((pin) => pin === obj.pin);
        if (!endpoint.activeIoIndex.includes(index)) {
            endpoint.activeIoIndex.push(index);
        }
        return this.update(endpoint);
    }
}

module.exports = new EndpointManager();
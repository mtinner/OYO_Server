'use strict';

let EndpointService = require('../service/EndpointService');


class EndpointManager {

    constructor() {
        this.endpointService = new EndpointService()
    }

    get(chipId) {
        return this.endpointService.get({chipId: chipId})
    }

    getAll() {
        return this.endpointService.getAll();
    }

    add(obj) {
       return this.get(obj.chipId)
            .then((doc) => {
                if (doc) {
                    return this.update({chipId: obj.chipId, ip: obj.ip})
                }
                else {
                    return this.endpointService.add(obj);
                }
            });
    }

    update(obj) {
        return this.endpointService.update({chipId: obj.chipId}, obj);
    }

    addInput(obj) {
        return this.get(obj.chipId)
            .then(endpoint => {
                if (endpoint) {
                    let index = endpoint.inputPins.findIndex((pin) => pin === obj.pin);
                    if (!endpoint.activeIoIndex.includes(index)) {
                        endpoint.activeIoIndex.push(index);
                    }
                    return this.update(endpoint);
                }
                return Promise.reject('no such endpoint');
            });
    }
}

module.exports = EndpointManager;
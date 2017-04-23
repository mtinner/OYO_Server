'use strict';

class EndpointService {

    constructor() {
        this.endpoints = [];
    }

    add(obj) {
        if (!this.endpoints.some(endpoint => endpoint.chipId === obj.chipId)) {
            this.endpoints.push(obj)
        }
        return this.endpoints;
    }

    update(obj) {
        this.endpoints = this.endpoints.map(endpoint => {
            if (endpoint.chipId === obj.chipId) {
                return Object.assign({}, endpoint, obj);
            }
            return endpoint;
        })
    }

    remove(ip) {
        this.endpoints = this.endpoints.filter(endpoint => endpoint.ip !== ip);
        return this.endpoints;
    }

    get(chipId) {
        return this.endpoints.find(endpoint => endpoint.chipId === chipId);
    }

    getAll() {
        return this.endpoints;
    }
}

module.exports = new EndpointService();

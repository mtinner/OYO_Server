'use strict';

class Endpoint {

    constructor(chipId, ip) {
        this.chipId = chipId;
        this.ip = ip;
        this.activeIoPair = [];
    }

    addIoPair(pairId) {
        return this.activeIoPair.push(pairId);
    }

    remove(pairId) {
        this.activeIoPair = this.activeIoPair.filter((id) => id !== pairId);
        return this.activeIoPair;
    }
}

module.exports = Endpoint;

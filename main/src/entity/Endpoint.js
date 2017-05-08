'use strict';

class Endpoint {

    constructor(chipId, ip) {
        this.chipId = chipId;
        this.ip = ip;
        this.ios = [];
        this.active = true;
    }

    addIO(io) {
        if (!this.ios.some(ioEntry => ioEntry.inputPin === io.inputPin)) {
            this.ios.push(io);
        }
    }
}

module.exports = Endpoint;

'use strict';

class Endpoint {

    constructor(chipId, ip, inputPins, outputPins) {
        this.chipId = chipId;
        this.ip = ip;
        this.activeIoIndex = [];
        this.inputPins = inputPins;
        this.outputPins = outputPins;
        this.active = true;
    }
}

module.exports = Endpoint;

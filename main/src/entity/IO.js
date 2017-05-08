'use strict';

const constants = require('../common/constants');

class IO {

    constructor(inputPin, outputPin, inputLevel = constants.LEVEL.DOWN, activated = false) {
        this.inputPin = inputPin;
        this.outputPin = outputPin;
        this.inputLevel = inputLevel;
        this.activated = activated;
    }
}

module.exports = IO;

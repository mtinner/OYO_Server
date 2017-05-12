import {CONSTANTS} from '../common/constants';

export class IO {

    constructor(public inputPin, private outputPin, private inputLevel = CONSTANTS.LEVEL.DOWN, private activated = false) {
        this.inputPin = inputPin;
        this.outputPin = outputPin;
        this.inputLevel = inputLevel;
        this.activated = activated;
    }
}
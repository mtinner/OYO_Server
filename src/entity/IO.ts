
import {constants} from '../common/constants';
export class IO {

    constructor(public inputPin, private outputPin, public inputLevel = constants.LEVEL.DOWN, public activated = false) {
        this.inputPin = inputPin;
        this.outputPin = outputPin;
        this.inputLevel = inputLevel;
        this.activated = activated;
    }
}
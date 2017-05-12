'use strict';
import {IO} from './IO';

export class Endpoint {
    private ios = new Array<IO>();
    // private active = true;

    constructor(public chipId: number, public  ip: string) {
        this.chipId = chipId;
        this.ip = ip;
    }

    addIO(io) {
        if (!this.ios.some((ioEntry: IO) => ioEntry.inputPin === io.inputPin)) {
            this.ios.push(io);
        }
    }
}


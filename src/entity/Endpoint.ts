'use strict';
import {IO} from './IO';

export class Endpoint {
    public ios = new Array<IO>();
    public active;

    constructor(public chipId: number, public  ip: string) {
        this.chipId = chipId;
        this.ip = ip;
    }

    setActive(bool: boolean) {
        this.active = bool;
    }

    addIO(io) {
        if (!this.ios.some((ioEntry: IO) => ioEntry.inputPin === io.inputPin)) {
            this.ios.push(io);
        }
    }
}



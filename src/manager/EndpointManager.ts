import {CONSTANTS} from '../common/constants';
import {EndpointService} from '../service/EndpointService';
import {Endpoint} from '../entity/Endpoint';
import {IO} from '../entity/IO';


export class EndpointManager {

    constructor(private endpointService: EndpointService) {
    }

    get(chipId) {
        return this.endpointService.get({chipId: chipId});
    }

    getAll() {
        return this.endpointService.getAll();
    }

    add(obj) {
        let endpoint = new Endpoint(obj.chipId, obj.ip);
        obj.ios.forEach(io => endpoint.addIO(new IO(io.inputPin, io.outputPin)));
        return this.get(endpoint.chipId)
            .then((doc) => {
                if (doc) {
                    return this.update({chipId: endpoint.chipId, ip: endpoint.ip})
                }
                else {
                    return this.endpointService.add(endpoint);
                }
            });
    }

    update(obj) {
        return this.endpointService.update({chipId: obj.chipId}, obj);
    }

    updateIOs(obj) {
        return this.get(obj.chipId)
            .then(endpoint => {
                if (endpoint) {
                    obj.ios.forEach(initialIO => {
                        let io = endpoint.ios.find(storeIO => storeIO.inputPin === initialIO.inputPin);
                        if (initialIO.inputLevel === CONSTANTS.LEVEL.UP) {
                            console.log('activated: ', io);
                            io.activated = true;
                        }
                        io.inputLevel = initialIO.inputLevel;
                    });
                    return this.update(endpoint);
                }
                return Promise.reject('no such endpoint');
            });
    }

    setAllInactive() {
        this.getAll()
            .then(endpoints => {
                let promises = [];
                endpoints.forEach((endpoint: Endpoint) => {
                    endpoint.active = false;
                    promises.push(this.update(endpoint));
                });
                return Promise.all(promises);
            })
    }

}
import { EndpointService } from '../service/EndpointService';
import { Endpoint } from '../entity/Endpoint';
import { getIOId, IO } from '../entity/IO';
import { constants } from '../common/constants';


export class EndpointManager {
	//private endpointRequester = new EndpointRequester();

	constructor(private endpointService: EndpointService) {
	}

	get(id) {
		return this.endpointService.get({ id: id });
	}

	getAll(filter = {}) {
		return this.endpointService.getAll(filter);
	}

	add(endpoint: Endpoint) {
		let promises = new Array<Promise<any>>();
		endpoint.ios.forEach((io: IO) => {
			let id = `${endpoint.chipId}_${io.inputPin}`;
			let promise = this.get(id)
				.then((doc) => {
					if (doc) {
						return this.update({ id: id, ip: endpoint.ip })
					}
					else {
						io.chipId = endpoint.chipId;
						io.id = id;
						return this.endpointService.add({ ...io, ip: endpoint.ip });
					}
				});
			promises.push(promise);
		});
		return Promise.all(promises);
	}

	update(io) {
		return this.endpointService.update({ id: io.id }, io);
	}

	// TODO
	/*	changeEndpoint(obj: IOutput): Promise<any> {
	 return this.get(obj.chipId)
	 .then((endpoint: Endpoint) => {
	 if (!endpoint) {
	 return Promise.reject('endpoint not found');
	 }
	 return this.endpointRequester.post(`http://${endpoint.ip}/output`, obj);
	 });
	 }*/

	setStatus(endpointFilter: { chipId?: number } = {}, status: 1 | 0) {

		return this.getAll(endpointFilter)
			.then((ios: IO[]) => {
				if (ios.length) {
					let promises = Array<Promise<IO>>();
					ios.forEach(io => {
						io.status = status;
						io.id = getIOId(io.chipId || endpointFilter.chipId, io.inputPin);
						promises.push(this.update(io));
					});
					return Promise.all(promises);
				}
				return Promise.reject('no such endpoint');
			});
	}

	setAllInactive() {
		return this.setStatus({}, constants.LEVEL.DOWN);
	}
}
import { EndpointService } from '../service/EndpointService';
import { Endpoint } from '../entity/Endpoint';
import { getIOId, IO } from '../entity/IO';
import { constants } from '../common/constants';
import { EndpointRequester } from '../EndpointRequester';


export class EndpointManager {
	private endpointRequester = new EndpointRequester();

	constructor(private endpointService: EndpointService) {
	}

	get(id: string): Promise<IO> {
		return this.endpointService.get({ id: id });
	}

	getAll(filter = {}): Promise<IO[]> {
		return this.endpointService.getAll(filter);
	}

	add(endpoint: Endpoint): Promise<any> {
		let promises = new Array<Promise<any>>();
		endpoint.ios.forEach((io: IO) => {
			let id = getIOId(endpoint.chipId, io.inputPin);
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

	update(io): Promise<IO> {
		return this.endpointService.update({ id: io.id }, io);
	}

	switchOutput(id: string): Promise<any> {
		return this.get(id)
			.then((io: IO) => {
				if (!io) {
					return Promise.reject('io not found');
				}
				let newValue = io.inputLevel === constants.LEVEL.DOWN ? constants.LEVEL.UP : constants.LEVEL.DOWN;
				return this.endpointRequester.post(`http://${io.ip}/output`, { ...io, value: newValue });
			});
	}

	setStatus(endpointFilter: { chipId?: number } = {}, status: 1 | 0, remoteIOS?: { outputPin: number, inputPin: number }[]): Promise<any> {

		return this.getAll(endpointFilter)
			.then((ios: IO[]) => {
				if (ios.length) {
					let promises = Array<Promise<IO>>();
					ios.forEach(io => {
						if (remoteIOS) {
							let remoteIO = remoteIOS.find(_ => _.inputPin === io.inputPin);
							io = { ...remoteIO, ...io };
						}
						io.status = status;
						io.id = getIOId(io.chipId || endpointFilter.chipId, io.inputPin);
						promises.push(this.update(io));
					});
					return Promise.all(promises);
				}
				return Promise.resolve([]);
			});
	}

	setAllInactive(): Promise<any> {
		return this.setStatus({}, constants.LEVEL.DOWN);
	}
}
import {EndpointService} from '../service/EndpointService';
import {Endpoint} from '../entity/Endpoint';
import {getIOId, IO} from '../entity/IO';
import {constants} from '../common/constants';
import {EndpointRequester} from '../EndpointRequester';
import {EventBus} from '../service/EventBus';


export class EndpointManager {
	private endpointRequester = new EndpointRequester();
	private eventBus: EventBus;

	constructor(private endpointService: EndpointService) {
		this.eventBus = EventBus.getInstance();
	}

	get(id: string): Promise<IO> {
		return this.endpointService.get({id: id});
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
						return this.update({id: id, ip: endpoint.ip})
					}
					else {
						io.chipId = endpoint.chipId;
						io.id = id;
						return this.endpointService.add({...io, ip: endpoint.ip});
					}
				});
			promises.push(promise);
		});
		return Promise.all(promises);
	}

	update(io): Promise<IO> {
		return this.endpointService.update({id: io.id}, io);
	}

	switchOutput(id: string): Promise<any> {
		return this.get(id)
			.then((io: IO) => {
				if (!io) {
					return Promise.reject('io not found');
				}
				let newValue = io.outputLevel === constants.LEVEL.UP ? constants.LEVEL.DOWN : constants.LEVEL.UP;
				return this.setOutput(io, newValue);
			});
	}

	setOutput(io: IO, value: 0 | 1): Promise<any> {
		return this.endpointRequester.post(`http://${io.ip}/output`, {...io, value: value})
			.then(res => this.update({...io, outputLevel: value}));
	};

	setBootupOutput(chipId: number) {
		return this.getAll({chipId})
			.then((ios: [IO]) => {
				const promises = ios.map(io => () => this.setOutput(io, io.outputLevel || 0));
				promises.reduce(function (cur, next) {
					return cur.then(next);
				}, Promise.resolve()).then(function () {
					return Promise.resolve();
				});
			})
	}

	switchOff(filter = {}): Promise<any> {
		return this.getAll(filter)
			.then((ios: IO[]) => {
				const promises = ios.map(io => () => this.switchOutput(io.id));
				promises.reduce(function (cur, next) {
					return cur.then(next);
				}, Promise.resolve()).then(function () {
					return Promise.resolve(promises);
				});
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
							io = {...remoteIO, ...io};
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
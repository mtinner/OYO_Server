export class Endpoint {
	public ios = new Array<{ outputPin: number, inputPin: number }>();
	public active;

	constructor(public chipId: number, public  ip: string) {
		this.chipId = chipId;
		this.ip = ip;
	}
}



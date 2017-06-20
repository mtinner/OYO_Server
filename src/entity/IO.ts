export interface IO {
	id: string;
	chipId: number;
	ip: string;
	title: string;
	toggleOutput: boolean;
	status: 0 | 1;
	inputPin: number
	outputPin: number;
	inputLevel: 0 | 1;
	activated: boolean;
}

export function getIOId(chipId: number, inputPin: number) {
	return `${chipId}_${inputPin}`;
}
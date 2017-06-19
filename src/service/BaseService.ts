import { Repository } from '../db/Repository';


export class BaseService<T> {

	constructor(private repository: Repository) {
	}

	get(document): Promise<T | null> {
		return this.repository.get(document);
	}

	getAll(filter = {}): Promise<T[]> {
		return this.repository.getAll(filter);
	}

	add(document: T): Promise<T | null> {
		return this.repository.add(document);
	}

	update(filter, document): Promise<T | null> {
		return this.repository.update(filter, { $set: document }, { returnOriginal: false });
	}
}

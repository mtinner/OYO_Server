import { FindAndModifyWriteOpResultObject, InsertOneWriteOpResult, MongoClient } from 'mongodb';

export class Repository {
	//private collection = null;
	private connectionPromise;

	constructor(documentName) {
		// TODO open close wrapper --> not in constructor
		this.connectionPromise = new Promise(function (resolve, reject) {
			let url = 'mongodb://localhost:27017/oyo';
			MongoClient.connect(url, (err, db) => {
				console.log('Error: ', err);
				let collection = db.collection(documentName);
				resolve(collection);
			});
		});

	}

	add(document): Promise<any> {
		return this.connectionPromise
			.then(collection => collection.insertOne(document))
			.then((result: InsertOneWriteOpResult) => result.ops[0])
			.then(this.removeId);
	}

	update(filter, document, options = null): Promise<any> {
		return this.connectionPromise
			.then(collection => collection.findOneAndUpdate(filter, document, options))
			.then((result: FindAndModifyWriteOpResultObject) => result.value)
			.then(this.removeId);
	}

	get(document): Promise<any> {
		return this.connectionPromise
			.then(collection => collection.findOne(document))
			.then(this.removeId);
	}

	getAll(filter): Promise<any> {
		return this.connectionPromise
			.then(collection => collection.find(filter).toArray())
			.then(this.removeId);
	}

	removeId(doc): Promise<any> {
		if (Array.isArray(doc)) {
			doc.forEach(item => delete item._id)
		}
		else if (doc && doc._id) {
			delete doc._id;
		}
		return Promise.resolve(doc);
	}
}
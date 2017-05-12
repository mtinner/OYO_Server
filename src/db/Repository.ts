import {MongoClient} from 'mongodb';

export class Repository {
    private collection = null;

    constructor(documentName) {
        // TODO open close wrapper --> not in constructor
        let url = 'mongodb://localhost:27017/oyo';
        MongoClient.connect(url, (err, db) => {
            console.log('Error: ', err);
            this.collection = db.collection(documentName);
        });
    }

    add(document) {
        return this.collection.insertOne(document);
    }

    update(filter, document) {
        return this.collection.updateOne(filter, document);
    }

    get(document) {
        return this.collection.findOne(document)
            .then(this.removeId);
    }

    getAll(document = {}) {
        return this.collection.find(document).toArray()
            .then(this.removeId);
    }

    removeId(doc) {
        if (Array.isArray(doc)) {
            doc.forEach(item => delete item._id)
        }
        else if (doc && doc._id) {
            delete doc._id;
        }
        return Promise.resolve(doc);
    }
}
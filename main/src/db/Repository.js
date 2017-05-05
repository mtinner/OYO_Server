var MongoClient = require('mongodb').MongoClient;

class Repository {

    constructor(documentName) {
        // TODO open close wrapper --> not in constructor
        let url = 'mongodb://localhost:27017/myproject';
        MongoClient.connect(url, (err, db) => {
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
        let cleanedItem = null;
        if (Array.isArray(doc)) {
            doc.forEach(item => delete item._id)
        }
        else {
            delete doc._id;
        }
        return Promise.resolve(doc);
    }
}


module.exports = Repository;
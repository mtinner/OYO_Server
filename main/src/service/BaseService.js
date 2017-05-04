'use strict';


class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    get(document) {
        return this.repository.get(document);
    }

    getAll(document) {
        return this.repository.getAll(document);
    }

    add(document) {
        return this.repository.add(document);
    }

    update(filter, document) {
        return this.repository.update(filter, {$set: document});
    }
}

module.exports = BaseService;

class EventBus {

    constructor() {
        this.subscribers = {};
    }

    observe(name, callback) {
        if (!this.subscribers[name]) {
            this.subscribers[name] = [];
        }
        this.subscribers[name].push(callback);
    }

    emit(name, data) {
        if (this.subscribers[name]) {
            this.subscribers[name].forEach(foo => foo(data));
        }
    }
}

module.exports = new EventBus();
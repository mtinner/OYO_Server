export class EventBus {
    private subscribers = {};

    constructor() {

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
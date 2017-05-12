export class EventBus {
    private subscribers = {};
    private static _instance: EventBus = new EventBus();

    constructor() {
        if (EventBus._instance) {
            throw new Error("Error: Instantiation failed: Use EventBus.getInstance() instead of new.");
        }
        EventBus._instance = this;
    }

    public static getInstance(): EventBus {
        return EventBus._instance;
    }

    observe(name, callback) {
        if (!this.subscribers[name]) {
            this.subscribers[name] = [];
        }
        this.subscribers[name].push(callback);
    }

    emit(name, data) {
        if (this.subscribers[name]) {
            console.log(this.subscribers[name]);
            this.subscribers[name].forEach(foo => foo(data));
        }
    }
}
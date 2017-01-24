'use strict';

/** Delegate event */
export default class EventHandler {
    /** Constructor for a new event handler */
    constructor() {
        this.listeners = [];
    }

    /**
     * Add a method to call
     * @param instance
     * @param method
     * @param params
     */
    add(instance, method, params = {}) {
        const listener = {instance: instance, method: method, params: params};
        this.listeners.push(listener);
        return listener;
    }

    remove(listener) {
        const index = this.listeners.indexOf(listener);
        if (index > -1)
            this.listeners.splice(index, 1);
    }

    /**
     * Call all methods for this handler
     * @param e
     */
    fire(e = {}) {
        for(let i = 0; i < this.listeners.length; ++i)
            this.listeners[i].instance[this.listeners[i].method](e, this.listeners[i].params);
    }
};
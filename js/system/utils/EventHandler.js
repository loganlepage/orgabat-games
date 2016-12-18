'use strict';
var Game = Game || {};
Game.Utils = Game.Utils || {};

/**
 * Delegate event
 * @type {EventHandler}
 */
Game.Utils.EventHandler = class EventHandler {
    /** Constructor for a new event handler */
    constructor() {
        this.calls = [];
    }

    /**
     * Add a method to call
     * @param instance
     * @param method
     */
    add(instance, method) {
        this.calls.push({instance: instance, method: method});
    }

    /**
     * Call all methods for this handler
     * @param param
     */
    fire(param) {
        for(let i = 0; i < this.calls.length; ++i)
            this.calls[i].instance[this.calls[i].method](param);
    }
};
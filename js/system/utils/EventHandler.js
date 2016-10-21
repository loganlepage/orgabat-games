'use strict';
var Game = Game || {};
Game.Utils = Game.Utils || {};

/**
 * delegate event
 */
Game.Utils.EventHandler = class EventHandler {
    constructor() {
        this.calls = [];
    }

    /**
     * Add a method to call
     */
    add(instance, method) {
        this.calls.push({instance: instance, method: method});
    }

    /**
     * Call all methods for this handler
     */
    fire(param) {
        for(let i = 0; i < this.calls.length; ++i)
            this.calls[i].instance[this.calls[i].method](param);
    }
};
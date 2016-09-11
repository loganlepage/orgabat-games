"use strict";
var Game = Game || {};
Game.Manager = Game.Manager || {};

/**
 * Constructor for a new modalManager (called by play state)
 */
Game.Manager.KeyboardManager = class KeyboardManager {
    constructor(name) {
        this.keys = new Game.Utils.Keyboard(game);
        this.createKeys();
    }

    /**
     * Management methods
     */
    check(name) {
        return this.keys.bool[name].state;
    };

    createKeys() {
        this.keys.addBool("A");
        this.keys.addBool("Z");
    };
};
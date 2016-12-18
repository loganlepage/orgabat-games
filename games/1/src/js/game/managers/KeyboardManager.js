"use strict";
var Game = Game || {};
Game.Manager = Game.Manager || {};

/**
 * Keyboard Manager (called by play state) (edit: NOT USED)
 * @type {Keyboard}
 */
Game.Manager.Keyboard = class Keyboard {

    /**
     * Constructor for a new keyboard manager
     * @param name
     */
    constructor(name) {
        this.keys = new MyPhaser.Utils.Keyboard(game);
        this.createKeys();
    }

    /** Management methods */
    check(name) {
        return this.keys.bool[name].state;
    };
    createKeys() {
        this.keys.addBool("A");
        this.keys.addBool("Z");
    };
};
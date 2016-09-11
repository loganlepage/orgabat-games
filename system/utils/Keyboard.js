'use strict';
var Game = Game || {};
Game.Utils = Game.Utils || {};

/**
 * keyboard controller
 */
const KEYDOWN = true;
const KEYUP = false;
Game.Utils.Keyboard = class Keyboard extends Phaser.Keyboard {

    constructor(game) {
        super(game);
        this.game = game;
        this._evt = null;
        this.event = [];
        this.bool = [];
    }

    static getKey(code) {
        if(Phaser.Keyboard[code] !== undefined)
            return Phaser.Keyboard[code];
        else return code;
    }

    /**
     * Add a phaser key with string (required) and info (optional)
     * ex: instance.addBool("ENTER", {description: "The main keyboard key", for: "VehiclesMethods"});
     * It is not an event, use it on an update loop with (if instance.bool.state)
     */
    addBool(code, info) {
        this.bool[code] = {
            event: this.game.input.keyboard.addKey(Keyboard.getKey(code)),
            get state(){ return this.event.isDown }
        };
        if(info !== null) this.bool[code].info = info;
    }

    /**
     * Add a key event with the instance (required), method to call (required), decimal keycode (required) and info (optional)
     * ex: instance.addEvent(this, "moveTo", 37, {name: "left, axe: "x", signe: -1});}
     * see https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/keyCode
     * or use Phaser.Keyboard.{key}, it's a phaser constant variable
     */
    addEvent(instance, method, code, info) {
        this.event[code] = {
            event: game.input.keyboard.addKey(Keyboard.getKey(code)),
            get state(){ return this.event.isDown },
            instance: instance, method: method };
        if(info !== null) this.event[code].info = info;

        this.event[code].event.onDown.add(this.downEvent, this);
        this.event[code].event.onUp.add(this.upEvent, this);
    }
    downEvent(e) { this.keyboardManager(e.keyCode, Keyboard.KEYDOWN); }
    upEvent(e) { this.keyboardManager(e.keyCode, Keyboard.KEYUP); }

    keyboardManager(code, state) {
        let pointer = code;
        if(!state) //fix something that I forgot
            for (let i in this.event)
                if(this.event[i].state) {
                    pointer = i; state = !state;
                }
        this.event[pointer].instance[this.event[pointer].method](pointer, state);
    }
};

Object.assign(Game.Utils.Keyboard, { // static properties
    KEYDOWN: true,
    KEYUP: false
});
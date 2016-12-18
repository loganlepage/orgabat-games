'use strict';
var Game = Game || {};
Game.Utils = Game.Utils || {};

const KEYDOWN = true;
const KEYUP = false;
/**
 * Keyboard controller
 * @type {Keyboard}
 */
Game.Utils.Keyboard = class Keyboard extends Phaser.Keyboard {

    /**
     * Constructor for a new keyboard
     * @param game
     */
    constructor(game) {
        super(game);
        this.game = game;
        this._evt = null;
        this.event = [];
        this.bool = [];
    }

    /**
     * Return phaser code if exist
     * @param code
     * @returns {*}
     */
    static getKey(code) {
        if(Phaser.Keyboard[code] !== undefined)
            return Phaser.Keyboard[code];
        else return code;
    }

    /**
     * Add a phaser key with string (required) and info (optional)
     * ex: instance.addBool("ENTER", {description: "The main keyboard key", for: "VehiclesMethods"});
     * It is not an event, use it on an update loop with (if instance.bool.state)
     * @param code
     * @param info
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
     * @param instance
     * @param method
     * @param code
     * @param info
     */
    addEvent(instance, method, code, info) {
        this.event[code] = {
            event: this.game.input.keyboard.addKey(Keyboard.getKey(code)),
            get state(){ return this.event.isDown },
            instance: instance, method: method };
        if(info !== null) this.event[code].info = info;

        this.event[code].event.onDown.add(this.downEvent, this);
        this.event[code].event.onUp.add(this.upEvent, this);
    }

    /**
     * On key down
     * @param e
     */
    downEvent(e) { this.keyboardManager(e.keyCode, Keyboard.KEYDOWN); }

    /**
     * On key up
     * @param e
     */
    upEvent(e) { this.keyboardManager(e.keyCode, Keyboard.KEYUP); }

    /**
     * Call the method linked in instances[]
     * @param code
     * @param state
     */
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

/** Static properties */
Object.assign(Game.Utils.Keyboard, {
    KEYDOWN: true,
    KEYUP: false
});
'use strict';
import {Sprite, Group, Signal, Keyboard} from 'phaser';
import Type from 'system/utils/Type';

/**
 * Create a button
 */
export class Button extends Sprite {
    /**
     * Old dispatch method
     *
     * @see http://stackoverflow.com/questions/10455626/keydown-simulation-in-chrome-fires-normally-but-not-the-correct-key
     * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
     * @see https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/initKeyboardEvent
     * @see https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/initKeyEvent
     * @param type
     * @param key
     */
    static _old_dispatch(type, key) {
        const e = document.createEvent('KeyboardEvent');
        if(!Type.isExist(e.initKeyboardEvent) && !Type.isExist(e.initKeyEvent))
            throw 'initKeyboardEvent et https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/initKeyEvent non supportés';

        // Chromium Hack
        e.keyValue = key;
        Object.defineProperty(e, 'keyCode', { get: function () { return this.keyValue }});
        Object.defineProperty(e, 'which', { get: function () { return this.keyValue }});

        if (Type.isExist(e.initKeyboardEvent))
            e.initKeyboardEvent(type, true, true, document.defaultView, false, false, false, false, key, key);
        else
            e.initKeyEvent(type, true, true, document.defaultView, false, false, false, false, key, 0);

        document.dispatchEvent(e);
    }

    static dispatch(type, key) {
        try {
            //Button._old_dispatch(type, key);
            const e = new KeyboardEvent(type, {key:key, keyCode:key, which:key, bubbles:true});
            // Chromium Hack
            e.keyValue = key;
            Object.defineProperty(e, 'keyCode', { get: function () { return this.keyValue }});
            Object.defineProperty(e, 'which', { get: function () { return this.keyValue }});
            document.dispatchEvent(e);
        } catch(err) {
            console.log(err);
        }
    }

    set isDown(bool) {
        if(bool) {
            this.frame = 1;
            Button.dispatch('keydown', this.keyCode);
        } else {
            this.frame = 0;
            Button.dispatch('keyup', this.keyCode);
        }
    }
    get isDown() { return this.game.input.keyboard.isDown(this.keyCode) }

    constructor(game, group, keyCode, x, y, key, frame, props = {}) {
        super(game, x, y, key, frame);
        if(Type.isInstanceOf(group, Group))
            group.add(this);

        this.keyCode = keyCode;
        for(let key in props) this[key] = props[key];

        this.inputEnabled = true;
        this.events.onInputDown.add(() => this.isDown = true, this);
        this.events.onInputOver.add(() => this.isDown = true, this);
        this.events.onInputUp.add(() => this.isDown = false, this);
        this.events.onInputOut.add(() => this.isDown = false, this);
    }

    update() {
        if(!window.isMobile) return;
        if(this.isDown && this.game.input.pointer1.isUp)
            this.isDown = false;
    }
}

/**
 * Create a Joystick (default class, it's empty, use it as abstract)
 */
export default class Joystick extends Group {
    static get MARGIN() {return 10;}
    static get SCALE() {return 0.75;}

    constructor(game, parent) {
        super(game);
        if(Type.isInstanceOf(parent, Group))
            parent.add(this);
        this.fixedToCamera = true;
        this.cameraOffset.setTo(0, 0);
    }
}
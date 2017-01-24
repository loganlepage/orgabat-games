'use strict';
import {Sprite, Group, Signal, Keyboard} from 'phaser';
import Type from 'system/utils/Type';

/**
 * Create a button
 */
export class Button extends Sprite {
    set isDown(bool) {
        if(bool) {
            if(!this._isDown) {
                this.frame = 1;
                this._isDown = true;
                this.game.keys.key(this.keyCode).onDown.dispatch(this.game.keys.key(this.keyCode));
            }
        } else {
            if(this._isDown) {
                this.frame = 0;
                this._isDown = false;
                this.game.keys.key(this.keyCode).onUp.dispatch(this.game.keys.key(this.keyCode));
            }
        }
    }
    get isDown() { return this._isDown; }
    constructor(game, group, keyCode, x, y, key, props = {}) {
        super(game, x, y, key);
        if(Type.isInstanceOf(group, Group))
            group.add(this);

        this.keyCode = keyCode;
        this._isDown = false;
        for(let key in props) this[key] = props[key];

        this.inputEnabled = true;
        this.events.onInputDown.add(() => this.isDown = true, this);
        this.events.onInputOver.add(() => this.isDown = true, this);
        this.events.onInputUp.add(() => this.isDown = false, this);
        this.events.onInputOut.add(() => this.isDown = false, this);
    }
    update() {
        if(!window.isSmartphone) return;
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
    static preload(game) {
        game.load.spritesheet('pad_r', `${assets_path}button/pad_r.png`, 120, 120);
        game.load.spritesheet('pad_fleche', `${assets_path}button/pad_fleche.png`, 120, 120);
        game.load.spritesheet('cross', `${assets_path}button/cross.png`, 144, 144);
        game.load.spritesheet('button_a', `${assets_path}button/bouton_a.png`, 96, 96);
        game.load.spritesheet('button_z', `${assets_path}button/bouton_z.png`, 96, 96);
        game.load.spritesheet('button_e', `${assets_path}button/bouton_e.png`, 96, 96);
    }

    // Supprime complètement un joystick
    destroy(joystick) {
        if(!Type.isInstanceOf(joystick, Joystick)) return;
        var destroy = (children) => children.forEach((child) => {
            if(Type.isInstanceOf(child, Group)) {
                if(child.children.length > 0) destroy(child);
                else child.pendingDestroy = true; //le groupe sera supprimé au prochain update
            }
            if(Type.isInstanceOf(child, Button)) child.destroy();
        });
        destroy(joystick.children);
    }

    constructor(game, parent) {
        super(game);
        if(Type.isInstanceOf(parent, Group))
            parent.add(this);
        this.fixedToCamera = true;
        this.cameraOffset.setTo(0, 0);
    }
}
'use strict';
import Phaser from 'phaser';
import Type from 'system/utils/Type';

export default class Keys {
    constructor(game) {
        this.game = game;
        this.keys = [];
    }

    key(keyCode) {
        if(!Type.isExist(this.keys[keyCode]))
            this.keys[keyCode] = this.game.input.keyboard.addKey(keyCode);
        return this.keys[keyCode];
    }

    removeKey(key) {
        this.game.input.keyboard.removeKey(key);
    }
};
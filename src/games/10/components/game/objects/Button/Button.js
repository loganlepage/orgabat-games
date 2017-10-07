"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ButtonSprite from "./ButtonSprite";
import Phaser from 'phaser';

export default class Button extends BasicGameObject {

    constructor(game, x, y, key) {
        super(game);
        this.addSprite(new ButtonSprite({
            game: this.game,
            x: x,
            y: y,
            key: key,
            buttonObj: this
        }));
        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;
    }

    destroy() {
        this.sprite.destroy(true);
    }

    changeSprite(key){
        this.sprite.destroy();
        this.addSprite(new ButtonSprite({
            game: this.game,
            x: this.x,
            y: this.y,
            key: key,
            buttonObj: this
        }));
    }
}
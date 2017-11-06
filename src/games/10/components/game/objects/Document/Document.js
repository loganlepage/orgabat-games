"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import DocumentSprite from "./DocumentSprite";
import Phaser from 'phaser';

export default class Document extends BasicGameObject {

    constructor(game, x, y, key) {
        super(game);
        this.addSprite(new DocumentSprite({
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
}
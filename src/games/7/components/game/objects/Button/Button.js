"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ButtonSprite from "./ButtonSprite";
import Phaser from 'phaser';

export default class Button extends BasicGameObject {

    ready = false;

    constructor(game, x, y) {
        super(game);
        this.addSprite(new ButtonSprite({
            game: this.game,
            x: x,
            y: y,
            buttonObj: this
        }));
        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;
        /*this.addSprite(new ButtonSprite(
            this.game,
            x,
            y,
            null,
            this
        ));*/
        this.ready = true;
    }

    destroy() {
        this.sprite.destroy(true);
    }

    preUpdate() {
        //
    }

    update() {
        //
    }

    postUpdate() {
        //
    }

    updateTransform() {
        //
    }

    _renderCanvas() {
        //
    }
}
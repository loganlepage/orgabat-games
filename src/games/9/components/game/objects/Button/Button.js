"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ButtonSprite from "./ButtonSprite";
import Phaser from 'phaser';

export default class Button extends BasicGameObject {

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
    }

    destroy() {
        this.sprite.destroy(true);
    }

    // preUpdate() {
    //     //
    // }

    // update() {
    //     //
    // }

    // postUpdate() {
    //     //
    // }

    // updateTransform() {
    //     //
    // }

    // _renderCanvas() {
    //     //
    // }
}
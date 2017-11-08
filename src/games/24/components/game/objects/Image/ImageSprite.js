"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ImageSprite extends BasicGameSprite {
    constructor(game, x, y, key, buttonObj) {
        super(game, x, y, `jeu24/images/${key}`, buttonObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.4 * this.game.SCALE);
    }
};
"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ElementSprite extends BasicGameSprite {
    constructor(game, x, y, key, buttonObj) {
        super(game, x, y, `jeu11/list/${key}`, buttonObj);
        this.anchor.setTo(0);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
    }
};
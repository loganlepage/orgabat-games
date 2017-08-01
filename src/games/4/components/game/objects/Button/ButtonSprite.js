"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ButtonSprite extends BasicGameSprite {
    constructor({game, x, y, key, buttonObj}) {
        super(game, x, y, `jeu4/${key}`, buttonObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.5);
    }
};
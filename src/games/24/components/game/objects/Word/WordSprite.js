"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class WordSprite extends BasicGameSprite {
    constructor(game, x, y, key, buttonObj) {
        super(game, x, y, `jeu24/mots/${key}`, buttonObj);
        this.anchor.setTo(0.5);
    }
};
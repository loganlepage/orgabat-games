"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ButtonSprite extends BasicGameSprite {
    constructor({game, x, y, key = 'jeu10/other/continuer', buttonObj}) {
        super(game, x, y, key, buttonObj);
        this.anchor.setTo(0.5);
        this.scale.set(this.game.SCALE);
    }
};
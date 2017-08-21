"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ResponseSprite extends BasicGameSprite {

    constructor(game, x, y, link, buttonObj) {
        super(game, x, y, `jeu13/${link}`, buttonObj);
        this.anchor.setTo(0.5);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        // this.game.layer.zDepth1.addChild(this);
    }
};
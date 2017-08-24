"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ResponseSprite extends BasicGameSprite {

    constructor(game, x, y, link, buttonObj) {
        super(game, x, y, `jeu15/epi/${link}`, buttonObj);
        // this.anchor.setTo(0.5);
        this.scale.set(this.game.SCALE);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
    }

    removeInputs() {
		this.inputEnabled = false;
        this.input.useHandCursor = false;
    }

    addInputs() {
		this.inputEnabled = true;
        this.input.useHandCursor = true;
    }
};
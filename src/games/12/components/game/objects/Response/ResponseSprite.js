"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ResponseSprite extends BasicGameSprite {

    constructor(game, x, y, link, buttonObj) {
        super(game, x, y, `jeu12/shapes/${link}`, buttonObj);
        this.anchor.setTo(0.5);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.input.enableDrag(false, true);
        this.originalPosition = this.position.clone();
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
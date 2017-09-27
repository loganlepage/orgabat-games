"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ResponseSprite extends BasicGameSprite {

    constructor(game, x, y, link, buttonObj) {
        super(game, x, y, `jeu15/epi/${link}`, buttonObj);
        this.scale.set(0.6 * this.game.SCALE);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        // To display sprtie dimensions
        // console.log(this.width);
        // console.log(this.height);
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
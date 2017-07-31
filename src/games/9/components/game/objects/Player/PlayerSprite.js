"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class PlayerSprite extends BasicGameSprite {
    constructor(game, x, y, buttonObj) {
        super(game, x, y, `jeu9/player/player`, buttonObj);
        this.anchor.setTo(0.5);
        // this.scale.set(0.5);
        this.input.enableDrag(false, true);
        this.originalPosition = this.position.clone();
    }

    initialize() {
    	this.position.x = this.originalPosition.x;
    	this.position.y = this.originalPosition.y;
    }

    addInputs() {
    	this.inputEnabled = true;
        this.input.useHandCursor = true;
    }

    removeInputs() {
		this.inputEnabled = false;
        this.input.useHandCursor = false;
    }
};
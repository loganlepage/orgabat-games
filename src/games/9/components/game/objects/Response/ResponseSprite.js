"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ResponseSprite extends BasicGameSprite {

    constructor(game, x, y, link, buttonObj) {
        super(game, x, y, `jeu9/${link}`, buttonObj);
        this.anchor.setTo(0.5);
        // this.scale.set(0.5);
        this.scale.set(0.75 * this.game.SCALE);
        this.originalPosition = this.position.clone();
    }

    cloneOriginalPosition() {
    	this.originalPosition = this.position.clone();
    }
};
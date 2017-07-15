"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class StepSprite extends BasicGameSprite {

    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu6/map`, itemObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.7);
        this.originalPosition = this.position.clone();
    }

    getInfos() {
    	return this;
    }

};

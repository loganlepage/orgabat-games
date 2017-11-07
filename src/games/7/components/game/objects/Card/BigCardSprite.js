"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class BigCardSprite extends BasicGameSprite {

    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu7/bigCards/${key}`, itemObj);
        this.anchor.setTo(0.5);
        this.scale.set(1.2 * this.game.SCALE);
        // this.originalPosition = this.position.clone();
        console.log(this.width);
        console.log(this.height);
    }

    getInfos() {
    	return this;
    }

};

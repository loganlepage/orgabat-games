"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class CardSprite extends BasicGameSprite {

    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu7/smallCards/${key}_sm`, itemObj);
        this.anchor.setTo(0, 0);
        this.scale.set(0.95);
        this.originalPosition = this.position.clone();
        // console.log(this.width);
        // console.log(this.height);
    }

    getInfos() {
    	return this;
    }

};

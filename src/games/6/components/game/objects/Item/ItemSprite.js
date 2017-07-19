"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ItemSprite extends BasicGameSprite {
    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu6/${key}`, itemObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.5);
        this.input.enableDrag();
        this.originalPosition = this.position.clone();
    }

    getInfos() {
    	return this;
    }

};

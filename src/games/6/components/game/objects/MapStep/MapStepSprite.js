"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class MapStepSprite extends BasicGameSprite {

    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu6/${key}`, itemObj);
        this.anchor.setTo(0);
        this.scale.set(0.95 * this.game.SCALE);
        this.originalPosition = this.position.clone();
        // console.log(this.width);
        // console.log(this.height);
    }

};

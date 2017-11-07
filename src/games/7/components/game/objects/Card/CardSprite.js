"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class CardSprite extends BasicGameSprite {

    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu7/bigCards/${key}`, itemObj);
        this.anchor.setTo(0.5, 0.5);
        this.scale.set(0.32 * this.game.SCALE);
        // console.log(this.width / this.game.SCALE);
        // console.log(this.height / this.game.SCALE);
    }

};

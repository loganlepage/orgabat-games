"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ResponseSprite extends BasicGameSprite {

    constructor(game, x, y, link, buttonObj) {
        super(game, x, y, `jeu17/images/${link}`, buttonObj);
        this.anchor.setTo(0);
        this.scale.set(0.3 * this.game.SCALE);
        this.originalPosition = this.position.clone();
    }

};
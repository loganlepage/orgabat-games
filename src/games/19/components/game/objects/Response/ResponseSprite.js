"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ResponseSprite extends BasicGameSprite {

    constructor(game, x, y, link, buttonObj) {
        super(game, x, y, `jeu19/items/${link}`, buttonObj);
        this.link = link;
        this.anchor.setTo(0.5);
        this.scale.set(0.4 * this.game.SCALE);
        this.originalPosition = this.position.clone();
    }

};
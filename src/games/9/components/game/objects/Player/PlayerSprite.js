"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class PlayerSprite extends BasicGameSprite {

    constructor(game, x, y, buttonObj) {
        super(game, x, y, `jeu8/player`, buttonObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.5);
        this.originalPosition = this.position.clone();
    }
};
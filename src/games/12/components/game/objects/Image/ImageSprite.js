"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class PlayerSprite extends BasicGameSprite {
    constructor(game, x, y, key, buttonObj) {
        super(game, x, y, `jeu12/images/${key}`, buttonObj);
        this.anchor.setTo(0.5);
        // this.scale.set(0.5);
        // this.input.enableDrag(false, true);
    }
};
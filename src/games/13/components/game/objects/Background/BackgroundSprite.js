"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class PlayerSprite extends BasicGameSprite {
    constructor(game, x, y, key, obj) {
        super(game, x, y, `jeu13/${key}`, obj);
        this.anchor.setTo(0.5);
    }
};
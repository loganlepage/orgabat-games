"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ItemSprite extends BasicGameSprite {
    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu4/${key}`, itemObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.7);
        this.input.enableDrag();
        this.originalPosition = this.position.clone();
    }

};

"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ItemsSprite extends BasicGameSprite {
    constructor(game, x, y, key, itemsObj) {
        super(game, x, y, `jeu4/${key}`, itemsObj);
        this.anchor.setTo(0.5);
        this.input.enableDrag();
        this.originalPosition = this.position.clone();
    }

};

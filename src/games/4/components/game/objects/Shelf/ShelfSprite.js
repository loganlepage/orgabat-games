"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ShelfSprite extends BasicGameSprite {
    constructor({game, x, y, key, shelfObj}) {
        super(game, x, y, `jeu4/${key}`, shelfObj);
        this.anchor.setTo(1, 0);
        this.scale.set(0.5);
    }
};

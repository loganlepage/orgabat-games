"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class ShelfSprite extends BasicGameSprite {
    constructor({game, x, y, key = 'jeu4/etageres', shelfObj}) {
        super(game, x, y, key, shelfObj);
        this.anchor.setTo(0.5);
    }
};

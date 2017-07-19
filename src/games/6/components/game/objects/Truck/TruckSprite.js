"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class TruckSprite extends BasicGameSprite {
    constructor({game, x, y, key = 'jeu6/truck', truckObj}) {
        super(game, x, y, key, truckObj);
        this.anchor.setTo(0.5, 0.5);
        // this.position.setTo(50, 350);
    }
};

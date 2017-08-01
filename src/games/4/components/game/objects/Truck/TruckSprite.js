"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class TruckSprite extends BasicGameSprite {
    constructor({game, x, y, key, truckObj}) {
        super(game, x, y, `jeu4/${key}`, truckObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.5);
    }
};

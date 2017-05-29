"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class TruckSprite extends BasicGameSprite {
    constructor({game, x, y, key = 'jeu4/truck', truckObj}) {
        super(game, x, y, key, truckObj);
        this.anchor.setTo(0.5);
        this.input.enableDrag();
        this.input.draggable = false;
        this.inputEnabled = false;
    }
};

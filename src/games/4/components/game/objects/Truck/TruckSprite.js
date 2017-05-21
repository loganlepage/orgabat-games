"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class TruckSprite extends BasicGameSprite {
    constructor({game, x, y, key = 'jeu4/truck', truckObj}) {
        super(game, x, y, key, truckObj);
        this.anchor.setTo(0.5);
        this.input.enableDrag();
    }

    showCapacity() {
        //do something showing truck capacity on click or on hover ...
        //From now on it's moving truck by 15 degrees clockwise
        this.angle += 15
    }
};
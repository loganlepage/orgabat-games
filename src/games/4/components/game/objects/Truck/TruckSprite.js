"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class TruckSprite extends BasicGameSprite {
    constructor({game, x, y, key, truckObj}) {
        super(game, x, y, `jeu4/${key}`, truckObj);
        // Pour placer les objets dans la remorque, et non au centre du camion lors du checkOverLap de l'item
        this.anchor.setTo(0.6, 0.4);
        this.scale.set(0.6);
    }
};

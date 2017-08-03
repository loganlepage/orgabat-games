"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import TruckSprite from "./TruckSprite";
import Phaser from 'phaser';

export default class Truck extends BasicGameObject {
    ready = false;

    constructor({game, x, y, key}) {
        super(game);
        this.addSprite(new TruckSprite({
            game: this.game,
            x: x,
            y,
            key: key,
            truckObj: this
        }));
        this.ready = true;
    }

    destroy() {
        this.sprite.destroy();
    }
}
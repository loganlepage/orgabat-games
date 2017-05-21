"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import TruckSprite from "./TruckSprite";

export default class Truck extends BasicGameObject {
    ready = false;

    constructor({ game, x = game.world.center, y = game.world.height }){
        super(game);
        this.addSprite(new TruckSprite({
            game: this.game,
            x: x,
            y: y,
            truckObj: this
        }));
        this.ready = true;
    }
}
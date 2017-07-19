"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import TruckSprite from "./TruckSprite";
import Phaser from 'phaser';

export default class Truck extends BasicGameObject {
    ready = false;

    constructor({game, x, y}) {
        super(game);
        this.addSprite(new TruckSprite({
            game: this.game,
            x: x,
            y: y,
            truckObj: this
        }));
        this.ready = true;
    }

    // checkOverlap(currentSprite, spriteToOverlap) {
    //     let boundsA = currentSprite.getBounds(),
    //         boundsB = spriteToOverlap.getBounds();
    //     if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
    //         currentSprite.input.draggable = false;
    //         currentSprite.position.copyFrom(spriteToOverlap.position);
    //         currentSprite.anchor.setTo(spriteToOverlap.anchor.x, spriteToOverlap.anchor.y);
    //     }
    //     else
    //         currentSprite.position.copyFrom(currentSprite.originalPosition);
    // }
}
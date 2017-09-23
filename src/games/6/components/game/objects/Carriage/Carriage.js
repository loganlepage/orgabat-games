"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import CarriageSprite from "./CarriageSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Carriage extends BasicGameObject {
    onDropped = new Phaser.Signal();

    constructor({game, x, y}) {
        super(game);
        this.addSprite(new CarriageSprite({
            game: this.game,
            x: x,
            y: y,
            shelfObj: this
        }));
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            this.onDropped.dispatch(currentSprite);
            return true;
        }
        else
            // currentSprite.position.copyFrom(currentSprite.originalPosition);
            return false;
    }
}
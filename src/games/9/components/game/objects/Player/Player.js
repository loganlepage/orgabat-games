"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";
import PlayerSprite from "./PlayerSprite";

export default class Player extends BasicGameObject {

    // onDropped = new Signal();

    constructor(game, x, y, key, file, position) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.position = position;
        this.addSprite(new PlayerSprite(this.game, this.x, this.y, this));
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            currentSprite.position.x = spriteToOverlap.position.x;
            currentSprite.position.y = spriteToOverlap.position.y;
            this.onDropped.dispatch(currentSprite);
            return true;
        }
        else
            currentSprite.position.copyFrom(currentSprite.originalPosition);
            return false;
    }
}
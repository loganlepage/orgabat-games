"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import PlayerSprite from "./PlayerSprite";

export default class Player extends BasicGameObject {

    onDropped = new Signal();

    constructor(game, x, y) {
        super(game);
        this.addSprite(new PlayerSprite(this.game, x, y, this));
    }

    initialize() {
        this.sprite.addInputs();
        this.sprite.initialize();
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds(),
            overlapHeight = spriteToOverlap.height + 20;
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            currentSprite.position.x = spriteToOverlap.position.x;
            currentSprite.position.y = spriteToOverlap.position.y + overlapHeight;
            this.sprite.removeInputs();
            this.onDropped.dispatch(currentSprite);
            return true;
        }
        else
            currentSprite.position.copyFrom(currentSprite.originalPosition);
            return false;
    }
}
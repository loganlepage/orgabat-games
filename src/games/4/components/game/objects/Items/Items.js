"use strict";
import ItemsSprite from "./ItemsSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Items extends BasicGameObject {
    ready = false;
    onDropped = new Signal();

    constructor(game, key, category, x, y, isNeeded) {
        super(game);
        this.category = category;
        this.isNeeded = isNeeded;
        this.addSprite(new ItemsSprite(this.game, x, y, key, this));
        this.ready = true;
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            currentSprite.input.draggable = false;
            currentSprite.position.copyFrom(spriteToOverlap.position);
            currentSprite.anchor.setTo(spriteToOverlap.anchor.x, spriteToOverlap.anchor.y);
            this.onDropped.dispatch(currentSprite);
        }
        else
            currentSprite.position.copyFrom(currentSprite.originalPosition);
    }
}
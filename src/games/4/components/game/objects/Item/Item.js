"use strict";
import ItemSprite from "./ItemSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Item extends BasicGameObject {
    ready = false;
    onDropped = new Signal();

    constructor(game, file, key, x, y, isNeeded) {
        super(game);
        this.file = file;
        this.key = key;
        let link = this.file + "/" + this.key;
        this.addSprite(new ItemSprite(this.game, x, y, link, this));
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
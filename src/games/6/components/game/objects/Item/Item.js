"use strict";
import ItemSprite from "./ItemSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Item extends BasicGameObject {
    onDropped = new Signal();
    charged = false;

    constructor(game, key, category, x, y, isNeeded, clicked) {
        super(game);
        this.category = key;
        this.isNeeded = isNeeded;
        this.clicked = clicked;
        this.addSprite(new ItemSprite(this.game, x, y, key, this));
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            this.onDropped.dispatch(currentSprite);
            return true;
        } else {
            currentSprite.position.copyFrom(currentSprite.originalPosition);
            return false;
        }
    }

    check() {
        if (!this.clicked) {
            this.clicked = true;
            return true;
        } else {
            return false;
        }
    }
}
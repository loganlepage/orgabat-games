"use strict";
import ItemSprite from "./ItemSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Item extends BasicGameObject {
    ready = false;
    onDropped = new Signal();

    constructor(game, key, category, x, y, isNeeded, clicked) {
        super(game);
        this.category = key;
        this.isNeeded = isNeeded;
        this.clicked = clicked;
        this.addSprite(new ItemSprite(this.game, x, y, key, this));
        this.ready = true;
    }

    //relative to the parent
    static get X_BEGIN_AT() { return -600; }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            // currentSprite.input.draggable = true;
            // currentSprite.position.copyFrom(spriteToOverlap.position);
            // currentSprite.position.x = spriteToOverlap.position.x + Item.X_BEGIN_AT;
            // currentSprite.position.y = spriteToOverlap.position.y ;
            // currentSprite.anchor.setTo(spriteToOverlap.anchor.x, spriteToOverlap.anchor.y);
            this.onDropped.dispatch(currentSprite);
            return true;
        }
        else
            currentSprite.position.copyFrom(currentSprite.originalPosition);
            return false;
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
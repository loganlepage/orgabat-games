"use strict";
import ItemSprite from "./ItemSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Item extends BasicGameObject {
    ready = false;
    onDropped = new Signal();

    constructor(game, type, name, x, y, isNeeded, title) {
        super(game);
        this.type = type;
        this.name = name;
        this.isNeeded = isNeeded;
        this.title = title;
        let link = this.type + "/" + this.name;
        this.addSprite(new ItemSprite(this.game, x, y, link, this));
        this.ready = true;
    }

    removeControls() {
        this.sprite.removeControls();
    }

    addControls() {
        this.sprite.addControls();
    }

    initialize() {
        if (this.sprite.events.onDragStop != undefined) {
            this.sprite.events.onDragStop.removeAll();
        }
        if (this.sprite.events.onDropped != undefined) {
            this.sprite.events.onDropped.removeAll();
        }
        this.sprite.position.copyFrom(this.sprite.originalPosition);
        this.sprite.addControls();
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            currentSprite.input.draggable = false;
            currentSprite.position.copyFrom(spriteToOverlap.position);
            currentSprite.position.x += 1000;
            currentSprite.z = -20;
            this.onDropped.dispatch(currentSprite);
        }
        else {
            currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
    }
}
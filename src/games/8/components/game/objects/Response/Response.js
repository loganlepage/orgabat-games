"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    onDropped = new Signal();

    constructor(game, x, y, key, file, position) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.file = file;
        this.position = position;
        this.link = this.file + "/" + this.key;
        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.link, this));
        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            this.onDropped.dispatch(currentSprite);
            return true;
        }
        else
            currentSprite.position.copyFrom(currentSprite.originalPosition);
            return false;
    }
}
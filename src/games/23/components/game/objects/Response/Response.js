"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    onDropped = new Signal();

    constructor(game, x, y, key) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.key, this));
        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;
    }

    checkOverlap(currentSprite, shapeToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = shapeToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB) && shapeToOverlap.answers.includes(currentSprite.obj.key)) {
            currentSprite.position.x = shapeToOverlap.position.x;
            currentSprite.position.y = shapeToOverlap.position.y;
            this.onDropped.dispatch(currentSprite);
            return true;
        }
        else
            currentSprite.position.copyFrom(currentSprite.originalPosition);
            return false;
    }
}
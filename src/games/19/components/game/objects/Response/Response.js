"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    validated;
    onDropped = new Phaser.Signal();

    constructor(game, key, x, y) {
        super(game);
        this.key = key;
        this.x = x;
        this.y = y;
        this.addSprite(new ResponseSprite(
            this.game, 
            this.game.world.centerX + this.x * this.game.SCALE, 
            this.game.world.centerY + this.y * this.game.SCALE, 
            this.key, 
            this));
        this.validated = false;
        this.enableControls();
    }

    disableControls(){
        this.sprite.input.enableDrag(false, false);
        this.sprite.input.useHandCursor = false;
        this.sprite.inputEnabled = false;
    }

    enableControls(){
        if (!this.validated) {
            this.sprite.input.enableDrag(true, true);
            this.sprite.inputEnabled = true;
            this.sprite.input.useHandCursor = true;
        }

    }

    checkOverlap(currentSprite, shapeToOverlap) {
        if (!currentSprite.obj.validated) {
            let boundsA = currentSprite.getBounds(),
                boundsB = shapeToOverlap.getBounds();
            if (Phaser.Rectangle.intersects(boundsA, boundsB) && shapeToOverlap.data.correctAnswer.includes(currentSprite.link)) {
                currentSprite.obj.validate();
                currentSprite.position.copyFrom(shapeToOverlap.position);
                shapeToOverlap.destroy();
                this.onDropped.dispatch(currentSprite);
            } else if (Phaser.Rectangle.intersects(boundsA, boundsB) && !shapeToOverlap.data.correctAnswer.includes(currentSprite.link)) {
                currentSprite.position.copyFrom(currentSprite.originalPosition);
                PhaserManager.get('gabator').stats.changeValues({
                    health: PhaserManager.get('gabator').stats.state.health - 1,
                });
            } else {
                currentSprite.position.copyFrom(currentSprite.originalPosition);
            }
        }
    }

    validate(){
        this.validated = true;
        this.disableControls();
    }

    reset(){
        this.sprite.position.copyFrom(this.sprite.originalPosition);
    }
}
"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    onDropped = new Signal();

    x;
    y;
    item;
    title;

    constructor(game, x, y, item) {
        super(game);
        this.x = x;
        this.y = y;
        this.item = item;
        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.item.key, this));
        // this.title = this.game.add.text(x, y + 50 * game.SCALE, item.title, {font: 'Arial', fontSize: 20 * game.SCALE, fill: '#000000'});  // Horiz.
        this.title = this.game.add.text(x + this.sprite.width, y, item.title, {font: 'Arial', fontSize: 20 * game.SCALE, fill: '#000000'}); // Verti
        this.title.anchor.setTo(0, 0.5);
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        console.log("Overlap");
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            currentSprite.position.x = spriteToOverlap.position.x;
            currentSprite.position.y = spriteToOverlap.position.y;
            this.sprite.removeInputs();
            this.onDropped.dispatch(currentSprite);
            return true;
        }
        else
            currentSprite.position.copyFrom(currentSprite.originalPosition);
            return false;
    }

    initialize() {
        this.sprite.position.copyFrom(this.sprite.originalPosition);
        this.sprite.addInputs();
    }

}
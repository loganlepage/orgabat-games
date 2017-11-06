"use strict";
import PhaserManager from 'system/phaser/utils/PhaserManager';
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
        this.title = this.game.add.text(x + this.sprite.width, y, item.title, {font: 'Arial', fontSize: 24 * game.SCALE, fill: '#000000'}); // Verti
        this.title.anchor.setTo(0, 0.5);
        this.game.layer.zDepth1.addChild(this.title);
    }

    checkOverlap(currentSprite, spriteToOverlap) {
        let boundsA = currentSprite.getBounds(),
            boundsB = spriteToOverlap.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            return true;
        } else {
            return false;
        }
    }

    initialize() {
        // Remove all inputs
        this.sprite.events.onInputDown.removeAll();
        this.sprite.events.onDragStop.removeAll();
        this.sprite.position.copyFrom(this.sprite.originalPosition);
        this.sprite.addInputs();
    }

    destroy(){
        console.log("Destroy");
        this.title.destroy();
        this.sprite.destroy();
    }

    preUpdate() {
        //
    }

    update() {
        //
    }

    postUpdate() {
        //
    }

    updateTransform() {
        //
    }

    _renderCanvas() {
        //
    }

}
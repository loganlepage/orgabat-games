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
        this.title = this.game.add.text(
            this.x, 
            this.y + this.sprite.height/2 + 20 * this.game.SCALE,
            this.item.title, 
            {
                font: 'Arial', 
                fontSize: 20 * game.SCALE, 
                fill: '#000000'
            }
        );
        this.game.layer.zDepth1.addChild(this.title);
        // Anchors
        this.title.anchor.setTo(0.5);
        this.anchorY = this.sprite.height/(this.sprite.height + this.title.height / 2);
        this.sprite.anchor.setTo(0.5, this.anchorY);
    }

    initialize() {
        if (this.shape != undefined) {
            this.shape.destroy();
            this.sprite.events.onInputDown.removeAll();
        }
    }

    validate() {
        let yPosition = this.y - (1-this.anchorY)*this.sprite.height;
        this.shape = this.game.add.graphics(this.x, yPosition);
        this.shape.lineStyle(2, 0x000000, 1);
        this.shape.beginFill(0x008000, 0.25);
        this.shape.drawCircle(0, 0, 150 * this.game.SCALE);
        this.game.layer.zDepth0.addChild(this.shape);
    }

}
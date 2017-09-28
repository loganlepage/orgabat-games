"use strict";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Image from "../Image/Image";
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
            // this.y + this.sprite.height/2 /* * this.game.SCALE */,
            this.y + 50 * this.game.SCALE,
            this.item.title, 
            {
                font: 'Arial', 
                fontSize: 20 * game.SCALE, 
                fill: '#000000',
            }
        );
        this.game.layer.zDepth1.addChild(this.title);
        // Anchors
        this.title.anchor.setTo(0.5);
        this.anchorY = this.sprite.height/(this.sprite.height + this.title.height / 2);
        this.sprite.anchor.setTo(0.5, this.anchorY);
    }

    addTooltips(item){
        let text = this.game.add.text(
            this.game.world.centerX,
            this.game.world.height - 75 * this.game.SCALE,
            item.obj.item.info,
            {
                font: 'Arial',
                fontSize: 25 * this.game.SCALE,
                fill: '#000000',
                backgroundColor: "white",
                align: "center",
                wordWrap: true,
                wordWrapWidth: this.game.world.width - 200
            }
        );
        text.padding.set(20, 20);
        text.anchor.setTo(0.5);
        return text;
    }

    destroy() {
        if (this.shape != undefined) {
            this.shape.destroy();
        }
        this.sprite.events.onInputDown.removeAll();
        this.title.destroy();
        this.sprite.destroy();
        if (this.feedback != undefined) {
            this.feedback.sprite.destroy();
        }
    }

    validate() {
        let xPosition = this.x + 20 * this.game.SCALE;
        this.feedback = new Image(this.game, xPosition, this.y, "other/good");
        this.disabbleControls();
    }

    unvalidate() {
        let xPosition = this.x + 20 * this.game.SCALE;
        this.feedback = new Image(this.game, xPosition, this.y, "other/bad");
        this.disabbleControls();
    }

    disabbleControls(){
        this.sprite.events.onInputDown.removeAll();
        this.sprite.events.onInputDown.removeAll();
        this.sprite.inputEnabled = false;
    }

}
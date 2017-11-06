"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";
import PhaserManager from 'system/phaser/utils/PhaserManager';

export default class Response extends BasicGameObject {

    validated;

    constructor(game, x, y, data, width) {
        super(game);
        this.x = x;
        this.y = y;
        this.data = data;
        this.width = width;
        this.validated = false;
        this.createResponse();
        this.enableControls();
    }

    createResponse(){
        this.text = this.game.add.text(
            this.x, 
            this.y, 
            this.data.title,
            {fill: '#666666', fontSize: 25 * this.game.SCALE, align: "left", wordWrap: true, wordWrapWidth: this.width - 100 * this.game.SCALE});
        if (this.data.image != undefined) {
            this.sprite = new ResponseSprite(this.game, this.x, this.y + this.text.height, this.data.image, this);
            this.game.layer.zDepth1.addChild(this.sprite);
        }
    }

    disableControls(){
        this.text.input.useHandCursor = false;
        this.text.inputEnabled = false;
        if (this.sprite != undefined) {
            this.sprite.input.useHandCursor = false;
            this.sprite.inputEnabled = false;
        }
    }

    enableControls(){
        if (!this.validated) {
            this.text.inputEnabled = true;
            this.text.input.useHandCursor = true;
            if (this.sprite != undefined) {
                this.sprite.input.useHandCursor = true;
                this.sprite.inputEnabled = true;
            }
        }
    }

    validate(){
        this.disableControls();
        // Image
        if (this.data.image != undefined) {
            this.rect = this.game.add.graphics(this.x, this.y + this.text.height);
            this.data.correct ? this.rect.lineStyle(5, 0x4CA64C, 1) : this.rect.lineStyle(5, 0xCC0000, 1);
            this.rect.drawRect(0, 0, this.sprite.width, this.sprite.height);
            this.game.layer.zDepth1.addChild(this.rect);
        }
        if (this.data.correct) {
            // Data
            this.validated = true;
            // Text
            this.text.addColor("#4CA64C", 0);
            return true;
        } else {
            PhaserManager.get('gabator').stats.changeValues({
                health: PhaserManager.get('gabator').stats.state.health - 1,
            });
            // Text
            this.text.addColor("#CC0000", 0);
            return false;
        }
    }

    reset(){
        this.sprite.position.copyFrom(this.sprite.originalPosition);
    }

    hide(){
        this.text.visible = false;
        if (this.sprite != undefined) {
            this.sprite.visible = false;
            if (this.rect != undefined) {
                this.rect.visible = false;
            }
        }
    }

    show(){
        this.text.visible = true;
        if (this.sprite != undefined) {
            this.sprite.visible = true;
            if (this.rect != undefined) {
                this.rect.visible = true;
            }
        }
    }
}
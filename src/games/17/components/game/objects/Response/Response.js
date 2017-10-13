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
    }

    disableControls(){
        this.text.input.useHandCursor = false;
        this.text.inputEnabled = false;
    }

    enableControls(){
        if (!this.validated) {
            this.text.inputEnabled = true;
            this.text.input.useHandCursor = true;
        }
    }

    validate(){
        this.disableControls();
        if (this.data.correct) {
            this.validated = true;
            this.text.addColor("#4CA64C", 0);
            return true;
        } else {
            PhaserManager.get('gabator').stats.changeValues({
                health: PhaserManager.get('gabator').stats.state.health - 1,
            });
            this.text.addColor("#CC0000", 0);
            return false;
        }
    }

    reset(){
        this.sprite.position.copyFrom(this.sprite.originalPosition);
    }
}
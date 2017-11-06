"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    validated;

    constructor(game, x, y, key, match) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.match = match;
        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.key, this));
        this.validated = false;
        this.enableControls();
    }

    disableControls(){
        this.sprite.input.useHandCursor = false;
        this.sprite.inputEnabled = false;
    }

    enableControls(){
        if (!this.validated) {
            this.sprite.inputEnabled = true;
            this.sprite.input.useHandCursor = true;
        }
    }

    move(){
        this.sprite.position.x = this.game.world.centerX + 150 * this.game.SCALE;
        this.sprite.position.y = this.game.world.centerY;
    }

    validate(){
        this.validated = true;
        // this.disableControls();
        this.sprite.destroy();
    }

    reset(){
        this.sprite.position.copyFrom(this.sprite.originalPosition);
    }
}
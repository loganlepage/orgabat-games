"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    constructor(game, x, y, key, file) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.key, this));
        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;
    }
}
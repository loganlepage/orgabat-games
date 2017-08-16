"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    onDropped = new Signal();

    constructor(game, x, y, key, file) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.file = file;
        this.link = this.file + "/" + this.key;
        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.link, this));
    }
}
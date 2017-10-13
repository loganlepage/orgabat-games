"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ImageSprite from "./ImageSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Image extends BasicGameObject {

    constructor(game, x, y, key) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.addSprite(new ImageSprite(this.game, this.x, this.y, this.key, this));
    }
}
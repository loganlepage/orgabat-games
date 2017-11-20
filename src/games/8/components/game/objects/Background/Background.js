"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import BackgroundSprite from "./BackgroundSprite";

export default class Background extends BasicGameObject {

    constructor(game, x, y, key) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.addSprite(new BackgroundSprite(this.game, this.x, this.y, this.key, this));
    }
}
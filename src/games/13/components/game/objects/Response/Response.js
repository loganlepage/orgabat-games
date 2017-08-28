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
    key;

    constructor(game, x, y, key) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;

        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.key, this));
        // this.game.layer.zDepth1.addChild(this.sprite);
        this.sprite.scale.set(0.45 * this.game.SCALE);
    }

}
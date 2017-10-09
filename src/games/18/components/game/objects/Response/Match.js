"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Match extends BasicGameObject {

    onDropped = new Signal();

    constructor(game, x, y, key, match) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.match = match;
        // this.addSprite(new MatchSprite(this.game, this.x, this.y, this.key, this));
        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.key, this));
    }
}
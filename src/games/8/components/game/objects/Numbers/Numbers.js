"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import NumbersSprite from "./NumbersSprite";

export default class Numbers extends BasicGameObject {

    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.addSprite(new NumbersSprite(this.game, this.x, this.y, this));
    }

    /*preUpdate() {
        //
    }

    update() {
        //
    }

    postUpdate() {
        //
    }

    updateTransform() {
        //
    }

    _renderCanvas() {
        //
    }*/
}
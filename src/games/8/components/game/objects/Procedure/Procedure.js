"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ProcedureSprite from "./ProcedureSprite";

export default class Procedure extends BasicGameObject {

    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.addSprite(new ProcedureSprite(this.game, this.x, this.y, this));
    }

    preUpdate() {
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
    }
}
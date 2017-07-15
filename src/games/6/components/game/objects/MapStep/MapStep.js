"use strict";
import MapStepSprite from "./MapStepSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class MapStep extends BasicGameObject {

    constructor(game, good, key, validated, position, x, y) {
        super(game);
        this.good = good;
        this.key = key;
        this.validated = validated;
        this.position = position;
        this.x = x;
        this.y = y;
        this.addSprite(new MapStepSprite(this.game, x, y, key, this));
    }

    check(currentPosition) {
        if (this.good && currentPosition == this.position && !this.validated) {
            return true;
        } else {
            return false;
        }
    }

    validate() {
        this.y += 100;
        this.sprite.position.y += 100;
        this.x = 300 + 100 * this.position;
        this.sprite.position.x = this.x;
        this.validated = true;
    }

    destroy(){
        this.sprite.destroy();
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
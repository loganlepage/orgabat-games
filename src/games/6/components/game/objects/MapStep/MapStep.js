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
        let littleMargin = 20 * this.game.SCALE;
        let bigMargin = 40 * this.game.SCALE;
        let cardsNumber = 3;

        let moveY = this.sprite.height + bigMargin;
        this.sprite.position.y += moveY;
        this.y += moveY;

        let marginX = (this.game.width - cardsNumber * this.sprite.width - (cardsNumber - 1) * littleMargin) / 2;
        marginX -= this.sprite.width;
        let moveX = marginX + (this.sprite.width * this.position) + (littleMargin * (this.position - 1));
        this.x = moveX;
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
"use strict";
import BigCardSprite from "./BigCardSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class BigCard extends BasicGameObject {

    constructor(game, x, y, key) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.key = key;
        // this.addSprite(new BigCardSprite(this.game, this.x, this.y, this.key, this));
    }

    addImage() {
        try {
            this.sprite.destroy()
        } catch (e) {
            //
        }
        this.addSprite(new BigCardSprite(this.game, this.x, this.y, this.key, this));
    }

    destroy() {
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
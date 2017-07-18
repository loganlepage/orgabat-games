"use strict";
import CardSprite from "./CardSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Card extends BasicGameObject {

    constructor(game, x, y, key, validated) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.validated = validated;
    }

    click() {
        // console.log("click");
        if (!this.validated) {
            // console.log("click and not validated");
            this.sprite.destroy();
            this.addSprite(new CardSprite(this.game, this.x, this.y, this.key, this));
            // this.sprite.events.onInputDown.add(this.clickBack, this);
        }
    }

    turnBack() {
        // console.log("turn back");
        if (!this.validated) {
            // console.log("turn back and not validated");
            try {
                this.sprite.destroy();
            } catch (e) {
                // console.log(e);
            }
            this.addSprite(new CardSprite(this.game, this.x, this.y, "cardBg", this));
        }
    }

    validate() {
        this.validated = true;
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
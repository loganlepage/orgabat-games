"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import CardSprite from "./CardSprite";
import BigCardSprite from "./BigCardSprite";
import BigCard from "./BigCard";

export default class Card extends BasicGameObject {

    zoomSignal = new Phaser.Signal();
    dezoomSignal = new Phaser.Signal();

    constructor(game, x, y, key, validated, clicked) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;
        this.validated = validated;
        this.clicked = clicked;
        this.isZoomed = false;
    }

    click() {
        if (!this.validated) {
            this.sprite.destroy();
            this.addSprite(new CardSprite(this.game, this.x, this.y, this.key, this));
            this.game.layer.zDepth0.addChild(this.sprite);
            this.sprite.inputEnabled = true;
            this.sprite.input.useHandCursor = true;
            // this.sprite.events.onInputOver.add(this.zoom, this); // Hover
            // this.sprite.events.onInputOut.add(this.dezoom, this); // Dezoom with mouse out
            this.sprite.events.onInputDown.add(this.zoom, this); // Click
        }
    }

    zoom() {
        if (!this.isZoomed) {
            this.zoomSignal.dispatch();
            this.isZoomed = true;

            this.bigCard = new BigCard(this.game, this.game.world.centerX, this.game.world.centerY, this.key, this);
            this.bigCard.addImage();
            this.game.layer.zDepth1.addChild(this.bigCard.sprite);
            this.bigCard.sprite.inputEnabled = true;
            this.bigCard.sprite.input.useHandCursor = true;

            // Draw a cross
            let crossWidth = 20*this.game.SCALE;
            let x = this.game.world.centerX + this.bigCard.sprite.width/2 + 10 * this.game.SCALE;
            let y = this.game.world.centerY - this.bigCard.sprite.height/2 - 10 * this.game.SCALE;

            this.graphics = this.game.add.graphics(0, 0);
            this.game.layer.zDepthOverAll.addChild(this.graphics);
            // add circle
            this.graphics.beginFill(0x333333, 1);
            this.graphics.drawCircle(x, y, 40 * this.game.SCALE);
            this.graphics.endFill();

            // add cross
            this.graphics.lineStyle(3, 0xFFFFFF, 1);

            x -= 10*this.game.SCALE;
            y -= 10*this.game.SCALE;

            this.graphics.moveTo(x,y);
            this.graphics.lineTo(x + crossWidth, y + crossWidth);
            this.graphics.moveTo(x + crossWidth,y);
            this.graphics.lineTo(x, y + crossWidth);
            this.graphics.endFill();

            this.bigCard.sprite.events.onInputDown.add(this.dezoom, this);
            this.graphics.inputEnabled = true;
            this.graphics.input.useHandCursor = true;
            this.graphics.events.onInputDown.add(this.dezoom, this);

        }
    }

    dezoom() {
        if (this.isZoomed) {
            this.dezoomSignal.dispatch();
            this.isZoomed = false;
            try {
                this.bigCard.destroy();
            } catch (e) {
                //
            }
            try {
                this.graphics.destroy();
            } catch (e) {
                //
            }
        }
    }

    turnBack() {
        if (!this.validated) {
            try {
                this.sprite.destroy();
            } catch (e) {
                //
            }
            this.addSprite(new CardSprite(this.game, this.x, this.y, "cardBg", this));
            this.game.layer.zDepth0.addChild(this.sprite);
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
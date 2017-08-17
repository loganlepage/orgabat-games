"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";

import Phaser from 'phaser';
import {Signal} from 'phaser';
import Config from "../../config/data";

// import Button from '../Button/Button';
import Image from "../Image/Image";
// import ResponseFactory from "../Response/ResponseFactory";

export default class Step extends BasicGameObject {

    finish = new Signal();

    game;

    title;
    image;
    responseGroup;

    constructor(game, itemsData, responseGroup, button) {

        super(game);

        this.itemsData = itemsData;
        this.responseGroup = responseGroup;
        this.button = button;

        // Title:
        this.title = this.game.add.text(
            this.game.world.centerX + 200 * game.SCALE, 
            this.game.world.centerY - 300 * game.SCALE, 
            this.itemsData.title, 
            {font: 'Arial', fontSize: 20 * game.SCALE, fill: '#000000'}
        );
        this.title.anchor.setTo(0.5);

        // Images:
        // this.image = new Image(this.game, this.game.world.centerX, this.game.world.centerY - 100 * game.SCALE, this.itemsData.key); // Horiz.
        this.image = new Image(this.game, this.game.world.centerX + 200 * game.SCALE, this.game.world.centerY, this.itemsData.key); // Verti.
        this.image.sprite.scale.set(1.2 * game.SCALE);
        this.game.layer.zDepth0.addChild(this.image.sprite);

        // Responses
        // this.responseGroup = new ResponseFactory(this.game, Config.responses);
        // this.game.layer.zDepth1.addChild(this.responseGroup);

        // Responses
        this.responseGroup.forEach((item) => {
            item.obj.initialize();
            item.events.onDragStop.add(function(currentSprite){
                item.obj.checkOverlap(currentSprite, this.image.sprite);
            }, this);
        });

        // Button
        this.button.sprite.events.onInputDown.removeAll();
        this.button.sprite.events.onInputDown.add(this.validate, this);
    }

    start() {
        //
    }

    validate() {
        this.finishStep();
    }

    finishStep() {
        this.title.destroy();
        this.image.sprite.destroy();
        this.image = null;
        // this.responseGroup.forEach((item) => {
        //     // item.destroy();
        //     // item.obj.title.destroy();
        // });
        // this.responseGroup = null;
        this.finish.dispatch();
    }
}
"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";

import Phaser from 'phaser';
import {Signal} from 'phaser';
import Config from "../../config/data";

import Image from "../Image/Image";
import Button from '../Button/Button';

export default class Step extends BasicGameObject {

    finish = new Signal();

    game;

    title;
    image;
    responseGroup;

    constructor(game, itemsData, responseGroup) {

        super(game);

        this.itemsData = itemsData;
        this.responseGroup = responseGroup;

        // Title:
        this.title = this.game.add.text(
            game.world.centerX + 200 * game.SCALE, 
            game.world.centerY - 300 * game.SCALE, 
            this.itemsData.title, 
            {font: 'Arial', fontSize: 20 * game.SCALE, fill: '#000000'}
        );
        this.title.anchor.setTo(0.5);

        // Images:
        this.image = new Image(
            game, 
            game.world.centerX + 300 * game.SCALE, 
            game.world.centerY, 
            this.itemsData,
            this.responseGroup
        ); // Verti.

        this.image.finish.addOnce(function(){
            // Button
            this.button = new Button(
                game, 
                game.world.width - 120 * game.SCALE, 
                game.world.height - 70 * game.SCALE, 
                "continue"
            );
            this.button.sprite.events.onInputDown.removeAll();
            this.button.sprite.events.onInputDown.add(this.finishStep, this);
        }, this);

        
    }

    finishStep() {
        this.title.destroy();
        this.image.destroy();
        this.button.destroy();
        this.finish.dispatch();
    }
}
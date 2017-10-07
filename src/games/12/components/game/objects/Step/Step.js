"use strict";

import BasicGameObject from "system/phaser/BasicGameObject";
import {Signal} from 'phaser';

import Image from "../Image/Image";
import Button from '../Button/Button';

export default class Step extends BasicGameObject {

    finish = new Signal();

    game;

    title;
    image;

    constructor(game, itemsData) {

        super(game);

        this.itemsData = itemsData;

        // Title:
        this.title = this.game.add.text(
            game.world.centerX + 300 * game.SCALE, 
            game.world.centerY - 300 * game.SCALE, 
            this.itemsData.title, 
            {font: 'Arial', fontSize: 22 * game.SCALE, fill: '#000000'}
        );
        this.title.anchor.setTo(0.5);

        // Images:
        this.image = new Image(
            game, 
            game.world.centerX + 300 * game.SCALE, 
            game.world.centerY, 
            this.itemsData,
        );

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
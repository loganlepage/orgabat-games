"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";

import Phaser from 'phaser';
import {Signal} from 'phaser';
import Config from "../../config/data";

import Canvas from "system/phaser/utils/PhaserManager";

import Image from "../Image/Image";
import Button from '../Button/Button';

export default class Step extends BasicGameObject {

    finish = new Signal();

    game;

    title;
    image;
    responseGroup;

    constructor(game, data, responseGroup) {

        super(game);

        this.data = data;
        this.responseGroup = responseGroup;

        // Title:
        this.title = this.game.add.text(
            this.game.world.width/4, 
            50 * this.game.SCALE, 
            this.data.title, 
            {font: 'Arial', fontSize: 30 * this.game.SCALE, fill: '#000000'}
        );
        this.title.anchor.setTo(0.5);

        // Image:
        this.image = new Image(
            this.game, 
            this.game.world.width/4, 
            this.game.world.centerY, 
            this.data.key
        );

        // Data details
        let answersNumber = 0,
            answerCount = 0;
        for (let answer in this.data.correctAnswer) {
            answersNumber++;
        }

        // Actions
        this.responseGroup.forEach((item) => {
            item.events.onInputDown.removeAll();
            item.events.onInputDown.add(function(){
                if (this.data.correctAnswer.includes(item.obj.item.key)) {
                    item.obj.validate();
                    answerCount++;
                    if (answerCount >= answersNumber) {
                        this.button = new Button(
                            this.game, 
                            this.game.world.width/4, 
                            this.game.world.height - 70 * this.game.SCALE, 
                            "continue"
                        );
                        this.button.sprite.events.onInputDown.removeAll();
                        this.button.sprite.events.onInputDown.add(this.finishStep, this);
                    }
                } else {
                    Canvas.get('gabator').modal.showHelp(
                        "Pas besoin de cet équipement ici"
                    );
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.state.health - 1,
                    });
                }
            },this)
        });

        
    }

    finishStep() {
        this.title.destroy();
        this.image.destroy();
        this.button.destroy();
        this.finish.dispatch();
    }
}
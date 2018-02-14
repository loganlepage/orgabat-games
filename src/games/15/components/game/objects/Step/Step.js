"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";

import Phaser from 'phaser';
import {Signal} from 'phaser';
import Config from "../../config/data";

import Canvas from "system/phaser/utils/PhaserManager";

import ResponseFactory from "../Response/ResponseFactory";
import Image from "../Image/Image";
import Button from '../Button/Button';

export default class Step extends BasicGameObject {

    finish = new Signal();

    game;

    title;
    image;

    constructor(game, data) {

        super(game);

        this.data = data;

        // Responses
        this.responseGroup = new ResponseFactory(game, this.data.responses);
        game.layer.zDepth1.addChild(this.responseGroup);

        // Title:
        this.title = this.game.add.text(
            // this.game.world.width/4, 
            50 * this.game.SCALE,
            50 * this.game.SCALE,
            this.data.title, 
            {
                font: 'Arial',
                fontSize: 25 * this.game.SCALE,
                fill: '#000000',
                align: 'left',
                wordWrap: true,
                wordWrapWidth: this.game.world.width - 200
            }
        );
        this.title.anchor.setTo(0);

        // Image:
        this.image = new Image(
            this.game, 
            this.game.world.width/4, 
            this.game.world.centerY, 
            "actions/"+this.data.key
        );

        // Data details
        let answersNumber = 0,
            answerCount = 0;
        for (let answer in this.data.correctAnswer) {
            answersNumber++;
        }

        // Actions
        this.responseGroup.forEach((item) => {
            // Tooltip
            item.events.onInputOver.add(() => {
                this.itemInfo = item.obj.addTooltips(item);
                // this.itemInfo.fontSize = mediumFont;
            }, this);
            item.events.onInputOut.add(() => {
                this.itemInfo.destroy();
            }, this);
            item.events.onInputDown.removeAll();
            item.events.onInputDown.add(function(){
                console.log(this.data.correctAnswer)
                console.log(item.obj.item.title)
                console.log(item.obj.item.key)
                if(item.obj.item.title == "") {
                    if (this.data.correctAnswer.includes(item.obj.item.key)){
                        item.obj.validate();
                        this.itemInfo.destroy();
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
                            this.responseGroup.forEach((item) => {
                                item.obj.disabbleControls();
                            });
                        }
                    }
                } else if (this.data.correctAnswer.includes(item.obj.item.title)) {
                    item.obj.validate();
                    this.itemInfo.destroy();
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
                        this.responseGroup.forEach((item) => {
                            item.obj.disabbleControls();
                        });
                    }
                } else {
                    item.obj.unvalidate();
                    this.itemInfo.destroy();
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
        this.responseGroup.destroy();
        this.title.destroy();
        this.image.destroy();
        this.button.destroy();
        this.finish.dispatch();
    }
}
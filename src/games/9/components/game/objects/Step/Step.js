"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";
import Canvas from "system/phaser/utils/PhaserManager";

import Phaser from 'phaser';
import {Signal} from 'phaser';

import Config from "../../config/data";

import Button from '../Button/Button';
import Player from "../Player/Player";
import ResponseFactory from "../Response/ResponseFactory";

export default class Step extends BasicGameObject {

    finish = new Signal();
    game;

    infoText;
    title;
    info;
    correctAnswer;

    player;
    responseGroup;
    button;

    constructor(game, stepData, responseGroup) {
        super(game);

        // Player
        this.player = new Player(game, game.world.centerX, game.world.centerY);
        // this.player = player;
        this.player.sprite.initialize();
        this.player.sprite.events.onDragStop.add(this.check, this);

        // Response group
        // this.responseGroup = new ResponseFactory(game, Config.responses);
        this.responseGroup = responseGroup;

        this.correctAnswer = stepData.correctAnswer;
        this.infoText = stepData.infoText;
        this.titleText = stepData.titleText;
        // Response title:
        this.title = game.add.text(this.game.world.centerX, 100*this.game.SCALE, this.titleText, {
            font: 'Arial', 
            fontSize: 25*this.game.SCALE, 
            fill: '#000000', 
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.game.world.width - 50 * this.game.SCALE
        });
        this.title.anchor.setTo(0.5);
    }

    check(){
        let elementNumber = this.getCorrectElement();
        // Player over the correct response
        if(this.player.checkOverlap(this.player.sprite, this.responseGroup.children[elementNumber].obj.sprite)){
            // Remove player inputs
            this.player.sprite.removeInputs();
            // Add informations text
            this.info = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200 * this.game.SCALE, this.infoText, {
                font: 'Arial', 
                fontSize: 25*this.game.SCALE, 
                fill: '#000000',
                align: "center",
                fontWeight: 'bold',
                wordWrap: true,
                wordWrapWidth: this.game.world.width - 50 * this.game.SCALE
            });
            this.info.setShadow(1, 1, 'rgba(255,255,255,0.4)', 5);
            this.info.anchor.setTo(0.5);
            // Add button
            this.button = new Button(this.game, this.game.world.width - 120 * this.game.SCALE, this.game.world.height - 70 * this.game.SCALE);
            this.button.sprite.events.onInputDown.add(this.finishStep, this);
        } else {
            for (let element in this.responseGroup.children) {
                // Player over wrong answer
                if(this.player.checkOverlap(this.player.sprite, this.responseGroup.children[element].obj.sprite)){
                    // Remove health point and add help message
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.state.health - 1,
                    });
                    Canvas.get('gabator').modal.showHelp(
                        "Mauvaise réponse"
                    );
                }
            }
        }
    }

    getCorrectElement() {
        for (let i = 0; i < this.responseGroup.children.length; i++) {
            if (this.responseGroup.children[i].obj.key === this.correctAnswer) {
                return i;
            }
        }
    }

    finishStep() {
        this.title.destroy();
        this.info.destroy();
        this.button.destroy();
        // this.responseGroup.destroy();
        // this.responseGroup = null;
        this.player.sprite.destroy();
        this.player = null;
        this.finish.dispatch();
    }

    destroy() {

    }
}
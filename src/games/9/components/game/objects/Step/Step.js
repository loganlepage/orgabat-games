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
        // Text without response:
        // this.title = this.game.add.text(20, 20, this.titleText, {font: 'Arial', fontSize: 20, fill: '#000000'});
        // Text with response:
        this.title = game.add.text(20, 20, this.titleText, {font: 'Arial', fontSize: 20, fill: '#000000'});
    }

    check(){
        let elementNumber = this.getCorrectElement();
        // Player over the correct response
        if(this.player.checkOverlap(this.player.sprite, this.responseGroup.children[elementNumber].obj.sprite)){
            // Remove player inputs
            this.player.sprite.removeInputs();
            // Add informations text
            this.info = this.game.add.text(20, this.game.world.height - 200, this.infoText, {font: 'Arial', fontSize: 20, fill: '#000000'});
            // Add button
            this.button = new Button(this.game, this.game.world.width - 100, this.game.world.height - 50);
            this.button.sprite.events.onInputDown.add(this.finishStep, this);
        } else {
            // Remove health point and add help message
            PhaserManager.get('gabator').stats.changeValues({
                health: PhaserManager.get('gabator').stats.state.health - 1,
            });
            Canvas.get('gabator').modal.showHelp(
                "Mauvaise réponse"
            );
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
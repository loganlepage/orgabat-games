"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";

import Phaser from 'phaser';
import {Signal} from 'phaser';

import Button from '../Button/Button';

export default class Step extends BasicGameObject {

    finish = new Signal();
    game;

    infoText;
    title;
    info;
    correctAnswer;

    responseGroup;
    button;
    player;

    constructor(game, stepData, responseGroup, player) {
        super(game);

        this.correctAnswer = stepData.correctAnswer;
        this.responseGroup = responseGroup;

        this.infoText = stepData.infoText;
        this.titleText = stepData.titleText;
        // Texte sans réponse:
        // this.title = this.game.add.text(20, 20, this.titleText, {font: 'Arial', fontSize: 20, fill: '#000000'});
        // Texte et réponse:
        this.title = this.game.add.text(20, 20, this.titleText + " (" + this.correctAnswer + ")", {font: 'Arial', fontSize: 20, fill: '#000000'});

        this.player = player;
        this.player.initialize();
        this.player.sprite.events.onDragStop.add(this.check, this);
    }

    check(){
        let elementNumber = this.getCorrectElement();
        if(this.player.checkOverlap(this.player.sprite, this.responseGroup.children[elementNumber].obj.sprite)){
            this.info = this.game.add.text(20, this.game.world.height - 300, this.infoText, {font: 'Arial', fontSize: 20, fill: '#000000'});
            this.button = new Button(this.game, this.game.world.width - 100, this.game.world.height - 50);
            this.button.sprite.events.onInputDown.add(this.finishStep, this);
        } else {
            PhaserManager.get('gabator').stats.changeValues({
                health: PhaserManager.get('gabator').stats.state.health - 1,
            });
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
        this.finish.dispatch();
    }

    displayText() {
        //
    }

    destroy(){
        //
    }
}
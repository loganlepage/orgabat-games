"use strict";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ModalSprite from "./ModalSprite";

export default class Question extends BasicGameObject {

    finish = new Signal();

    game;
    data;
    answer = [];

    constructor(game, data) {
        super(game);
        this.game = game;
        this.data = data;
        
        //Question title
        let x = 60 * this.game.SCALE,
            y = 20 * this.game.SCALE;

        this.title = this.game.add.text(
            x, 
            y, 
            this.data.title, 
            {
                font: 'Arial', 
                fontSize: 30 * this.game.SCALE, 
                fill: '#000000',
                wordWrap: true,
                wordWrapWidth: this.game.world.width - 50 * this.game.SCALE
            }
        );

        // x += 20;
        x = this.game.world.centerX;
        y += this.title.height + 40;

        // Answers
        for (let answerNumber in this.data.answers) {
            this.answer[answerNumber] = this.game.add.text(
                x, 
                y, 
                this.data.answers[answerNumber].title, 
                {
                    font: 'Arial', 
                    fontSize: 25 * this.game.SCALE, 
                    fill: '#000000',
                    wordWrap: true,
                    wordWrapWidth: this.game.world.width/2
                }
            );
            this.answer[answerNumber].correctAnswer = this.data.answers[answerNumber].correctAnswer;
            this.answer[answerNumber].inputEnabled = true;
            this.answer[answerNumber].input.useHandCursor = true;
            y += this.answer[answerNumber].height + 20;
        }
    }

    destroy(){
        this.title.destroy();
        for (let answer in this.answer){
            this.answer[answer].destroy();
        }
    }

}
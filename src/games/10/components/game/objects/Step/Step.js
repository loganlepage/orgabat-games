"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";

import Phaser from 'phaser';
import {Signal} from 'phaser';

import Button from '../Button/Button';
import QuestionFactory from "../Question/QuestionFactory";
import Graphic from "../Graphic/Graphic";

export default class Step extends BasicGameObject {

    finish = new Signal();
    game;
    stepData;
    graphic;
    questions = [];
    selectedAnswers = [];
    graphic;
    button;

    constructor(game, stepData) {
        super(game);
        this.stepData = stepData;
    }

    start() {

        try {
            this.destroyElements();
        } catch (e) {
            //
        }

        this.title = this.game.add.text(20, 20, this.stepData.title, {font: 'Arial', fontSize: 20, fill: '#000000'});

        this.questions = new QuestionFactory(this.game, this.stepData.questions);
    
        this.questions.forEach((question) => {
            
            question.answers.forEach((answer) => {
                answer.events.onInputDown.add(function(){
                    question.selectAnswer(answer);
                }, this);
            });
        });

        console.log("Start :");
        console.log(this.questions.children);

        this.button = new Button(this.game, this.game.world.width - 100, this.game.world.height - 50);

        this.button.sprite.events.onInputDown.add(function(){
            this.selectedAnswers = [];
            this.questions.forEach((question) => {
                this.selectedAnswers.push(question.checkAnswer());
            });
            for (let a in this.selectedAnswers) {
                for (let b in this.selectedAnswers[a]) {
                    if (!this.selectedAnswers[a].includes(false)) {
                        this.finishStep();
                    } else {
                        //
                    }
                }
            }
            // this.game.time.events.add(Phaser.Timer.SECOND * 2, this.start, this);
            this.button.sprite.events.onInputDown.add(this.start, this);
        }, this);
    }

    destroyElements() {
        this.title.destroy();
        console.log("Destroy: ");
        console.log(this.questions.children);
        this.questions.forEach((question) => {
            question.destroyTexts();
        });
        // this.questions.forEach((item) => {
        //     console.log(item);
        //     item.destroyElements();
        // });
        this.questions.destroy();
        this.button.destroy();
    }

    finishStep() {
        this.destroyElements();
        this.finish.dispatch();
    }
}
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

        // try {
        //     this.destroyElements();
        // } catch (e) {
        //     //
        // }

        // this.title = this.game.add.text(30 * this.game.SCALE, 30 * this.game.SCALE, this.stepData.title, {font: 'Arial', fontSize: 25 * this.game.SCALE, fill: '#000000'});
        this.questions = new QuestionFactory(this.game, this.stepData.questions);
        this.button = new Button(this.game, this.game.world.width - 100 * this.game.SCALE, this.game.world.height - 50 * this.game.SCALE);
        this.initQuestions();
    }

    initQuestions(){
        this.questions.forEach((question) => {
            question.answers.forEach((answer) => {
                answer.events.onInputDown.add(function(){
                    question.selectAnswer(answer);
                }, this);
            });
        });

        this.button.sprite.events.onInputDown.add(function(){

            let count = 0;
            this.questions.forEach((question) => {
                question.checkAnswer();
                if (question.isCompleted) {
                    count++;
                    console.log(count);
                    if (count >= this.questions.children.length) {
                        this.finishStep();
                    }
                }
            });

            // this.selectedAnswers = [];
            // this.questions.forEach((question) => {
            //     this.selectedAnswers.push(question.checkAnswer());
            // });
            // for (let a in this.selectedAnswers) {
            //     for (let b in this.selectedAnswers[a]) {
            //         if (!this.selectedAnswers[a].includes(false)) {
            //             this.finishStep();
            //         } else {
            //             //
            //         }
            //     }
            // }
            // // this.game.time.events.add(Phaser.Timer.SECOND * 2, this.start, this);
            // this.button.sprite.events.onInputDown.add(this.initQuestions, this);
        }, this);
    }

    destroyElements() {
        // this.title.destroy();
        this.questions.forEach((question) => {
            question.destroyTexts();
        });
        this.questions = null;
        this.button.destroy();
    }

    finishStep() {
        this.destroyElements();
        this.finish.dispatch();
    }
}
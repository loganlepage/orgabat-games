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
        this.questions = new QuestionFactory(this.game, this.stepData.questions);
        this.button = new Button(this.game, this.game.world.width - 100 * this.game.SCALE, this.game.world.height - 50 * this.game.SCALE);
        this.dataButton = new Button(this.game, this.game.world.width - 100 * this.game.SCALE, this.game.world.centerY);
        this.game.layer.zDepth2.addChild(this.dataButton.sprite);
        this.dataButton.sprite.events.onInputDown.add(this.createDocument, this);
        this.initQuestions();
    }

    createDocument(){
        this.dataButton.sprite.events.onInputDown.removeAll();
        this.graphics = this.game.add.graphics(0, 0);
        this.game.layer.zDepth1.addChild(this.graphics);
        this.graphics.lineStyle(0, "balck", 0);
        this.graphics.beginFill("black", 0.6);
        this.graphics.drawRect(0, 0, this.game.world.width, this.game.world.height);
        this.dataButton.sprite.events.onInputDown.add(this.removeDocument, this);
    }

    removeDocument(){
        this.graphics.destroy();
        this.dataButton.sprite.events.onInputDown.add(this.createDocument, this);
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
                    if (count >= this.questions.children.length) {
                        this.finishStep();
                    }
                }
            });
        }, this);
    }

    destroyElements() {
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
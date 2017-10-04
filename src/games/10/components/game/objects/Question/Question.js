"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import PhaserManager from 'system/phaser/utils/PhaserManager';

export default class Question extends BasicGameObject {

    finish = new Phaser.Signal();
    select = new Phaser.Signal();

    title;
    answers;
    solutions;

    texts = [];
    selectedAnswer = [];

    isCompleted;

    constructor(game, x, y, title, answers, solutions) {
        super(game);

        this.title = title;
        this.answers = answers;
        this.solutions = solutions;

        this.title = this.game.add.text(x, y, title, {font: 'Arial', fontSize: 25 * this.game.SCALE, fill: '#808080'});
        this.game.layer.zDepth0.addChild(this.title);
        this.texts.push(this.title);

        x += 30 * this.game.SCALE;
        for (let number in answers) {
            y += 35 * this.game.SCALE;
            this.answers[number] = this.game.add.text(x, y, answers[number], {font: 'Arial', fontSize: 20 * this.game.SCALE, fill: '#000000'});
            this.answers[number].inputEnabled = true;
            this.answers[number].input.useHandCursor = true;
            this.game.layer.zDepth0.addChild(this.answers[number]);
            this.texts.push(this.answers[number]);
        }

        this.isCompleted = false;
    }

    selectAnswer(answer) {
        this.selectedAnswer.push(answer);
        //answer.addColor("#ffffff", 0);
        answer.fontWeight = "bold";
        answer.inputEnabled = false;
        answer.input.useHandCursor = false;
    }

    checkAnswer() {
        // let resultArray = [];
        this.answers.forEach((answer) => {
            if (this.verifySelected(answer.text) && this.verifySolution(answer.text)) {
                answer.addColor("#4CA64C", 0);
                // resultArray.push(true);
                this.isCompleted = true;
            } else if (this.verifySelected(answer.text)) {
                PhaserManager.get('gabator').stats.changeValues({
                    health: PhaserManager.get('gabator').stats.state.health - 1,
                });
                answer.addColor("#CC0000", 0);
                // resultArray.push(false);
            } else {
                // resultArray.push(false);
            }
        });
        // return resultArray;
    }

    // If element is selected
    verifySelected(element) {
        for (let text in this.selectedAnswer) { // Array of Text object
            if (element == this.selectedAnswer[text].text) {
                return true;
            }
        }
    }

    // If element is a solution
    verifySolution(element) {
        for (let text in this.solutions) { // Array of texts
            if (element == this.solutions[text]) {
                return true;
            }
        }
    }

    destroyTexts() {
        this.texts.forEach((text) => {
            text.destroy();
        });
        // this.destroy();
    }

    preUpdate() {
        //
    }

    update() {
        //
    }

    postUpdate() {
        //
    }

    updateTransform() {
        //
    }

    _renderCanvas() {
        //
    }

}
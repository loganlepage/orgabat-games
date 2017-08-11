"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Question extends BasicGameObject {

    finish = new Phaser.Signal();
    select = new Phaser.Signal();

    title;
    answers;
    solutions;

    texts = [];
    selectedAnswer = [];

    constructor(game, x, y, title, answers, solutions) {
        super(game);

        this.title = title;
        this.answers = answers;
        this.solutions = solutions;

        this.title = this.game.add.text(x, y, title, {font: 'Arial', fontSize: 16, fill: '#000000'});
        this.texts.push(this.title);

        x += 30;
        for (let number in answers) {
            y += 20;
            this.answers[number] = this.game.add.text(x, y, answers[number], {font: 'Arial', fontSize: 16, fill: '#000000'});
            this.answers[number].inputEnabled = true;
            this.answers[number].input.useHandCursor = true;
            this.texts.push(this.answers[number]);
        }
    }

    selectAnswer(answer) {
        this.selectedAnswer.push(answer);
        answer.addColor("#ffffff", 0);
        answer.inputEnabled = false;
        answer.input.useHandCursor = false;
    }

    checkAnswer() {
        let resultArray = [];
        this.answers.forEach((answer) => {
            if (this.verifySelected(answer.text) && this.verifySolution(answer.text)) {
                answer.addColor("#4CA64C", 0);
                resultArray.push(true);
            } else if (this.verifySelected(answer.text)) {
                answer.addColor("#CC0000", 0);
                resultArray.push(false);
            } else {
                resultArray.push(false);
            }
        });
        return resultArray;
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
        console.log("Destroy question");
        this.texts.forEach((text) => {
            text.destroy();
        });
        this.destroy();
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
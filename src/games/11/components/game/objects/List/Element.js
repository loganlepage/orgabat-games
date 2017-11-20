"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import Button from "../Button/Button";
import ListModal from "../Modal/ListModal";

export default class Element extends BasicGameObject {

    onClicked = new Phaser.Signal();
    onClosed = new Phaser.Signal();
    key;
    correctAnswers;
    note;
    errors;
    modal;
    answers = [];

    constructor(game, x, y, key, name, correctAnswers, states) {
        super(game);

        this.key = key;
        this.name = name;
        this.correctAnswers = correctAnswers;
        this.states = states;

        // Fonts size
        let bigFont = 30 * this.game.SCALE,
            mediumFont = 25 * this.game.SCALE;

        // Title
        this.title = this.game.add.text(x, y, name, {font: 'Arial', fontSize: mediumFont, fill: '#000000'});
        this.game.layer.zDepth0.addChild(this.title);

        // Answers
        this.answersText = this.game.add.text(x + (340 * this.game.SCALE), y, "", {font: 'Arial', fontSize: mediumFont, fill: '#000000'})
        this.game.layer.zDepth0.addChild(this.answersText);

        // Add modal element for answers
        this.button = new Button(game, x + (300 * this.game.SCALE), y, "cross", this);
        this.button.sprite.anchor.setTo(0);
        this.button.sprite.scale.set(0.7 + 0.1 * this.game.SCALE);
        this.button.sprite.events.onInputDown.add(function(){
            this.onClicked.dispatch();
            // Answer list creation
            this.modal = new ListModal(
                game, 
                game.world.centerX, 
                game.world.centerY, 
                "half_modal", 
                "Réception du produit",
                this.states,
                this);
            // When answers are choosen
            this.modal.finish.add(function(){
                this.onClosed.dispatch();
                this.answers = [];
                this.modal.checkbox.forEach((element) => {
                    if (element.isSelected) {
                        this.answers.push(element.error);
                    }
                });
                // Add answer text next to the element
                this.answersText.text = "";
                this.answersText.addColor("#000000", 0);
                this.answers.forEach((answer) => {
                    this.answersText.text += answer + "  ";
                });
            }, this);
        }, this);
    }

    validateAnswer() {
        let result = this.checkAnswers(this.answers, this.correctAnswers);
        if (result) {
            this.answersText.addColor("#4CA64C", 0);
        } else {
            this.answersText.addColor("#CC0000", 0);
        }
        return result;
    }

    checkAnswers(array1, array2) {
        if (array1 === array2) {
            return true;
        }
        if (array1 == null || array2 == null){
            return false;
        }
        if (array1.length != array2.length) {
            return false;
        }
        // Different orders
        for (let i = 0; i < array1.length; ++i) {
            if (array1[i] !== array2[i]){
                return false;
            }
        }
        return true;
    }

    disableControls() {
        this.button.sprite.inputEnabled = false;
        this.button.sprite.input.useHandCursor = false;
    }

    enableControls() {
        this.button.sprite.inputEnabled = true;
        this.button.sprite.input.useHandCursor = true;
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
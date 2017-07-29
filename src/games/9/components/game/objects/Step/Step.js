"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from 'phaser';

export default class Step extends BasicGameObject {

    stepFinished = new Signal();

    constructor(game, answer, text) {
        super(game);
        this.answer = answer;
        this.text = text;
    }

    finishStep() {
        this.stepFinished.dispatch();
    }

    displayText() {
        // graphics
        // text
    }

    destroy(){
        //
    }
}
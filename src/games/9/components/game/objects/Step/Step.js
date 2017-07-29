"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from 'phaser';

// import ResponseFactory from "../Response/ResponseFactory";
// import Player from "../Player/Player";

export default class Step extends BasicGameObject {

    finish = new Signal();
    player;
    responseGroup;

    constructor(game, stepData) {
        super(game);
        console.log(stepData);
    }

    finishStep() {
        this.finish.dispatch();
    }

    displayText() {
        //
    }

    destroy(){
        //
    }
}
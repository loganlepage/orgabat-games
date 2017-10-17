"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";
import Canvas from "system/phaser/utils/PhaserManager";

import Phaser from 'phaser';
import {Signal} from 'phaser';

import Config from "../../config/data";

import ResponseFactory from "../Response/ResponseFactory";
import Background from "../Background/Background";

export default class Step extends BasicGameObject {

    finish = new Signal();
    game;
    stepData;

    constructor(game, stepData) {
        super(game);
        this.stepData = stepData;
    }

    start(){
        this.finishStep();
    }

    finishStep() {
        console.log("Finish step");
        this.finish.dispatch();
    }
}
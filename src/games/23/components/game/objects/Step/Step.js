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

    title;
    background;
    shapes;
    responseGroup;

    constructor(game, stepData) {
        super(game);
        this.stepData = stepData;

        // Response title:
        this.title = game.add.text(this.game.world.centerX, 50*this.game.SCALE, this.stepData.title, {
            font: 'Arial', 
            fontSize: 25*this.game.SCALE, 
            fill: '#000000', 
            align: "center"});
        this.title.anchor.setTo(0.5);

        // Background
        if (this.stepData.background != undefined) {
            this.background = new Background(
                this.game,
                this.game.world.centerX + 150 * this.game.SCALE,
                this.game.world.centerY,
                this.stepData.repo + this.stepData.background
            );
            this.game.layer.zDepth0.addChild(this.background.sprite);
        }

        // Shapes to answer
        let fill = true, // to fill or not
            radius = 100;
        if (this.stepData.shapes != undefined) {
            this.shapes = [];
            this.stepData.shapes.forEach((shape) => {
                let shapeGraphic = this.game.add.graphics(
                    shape.x * this.game.SCALE, 
                    shape.y * this.game.SCALE
                );
                shapeGraphic.answers = shape.answers;
                if (fill) {
                    shapeGraphic.beginFill(0xFF0000, .5);
                }
                shapeGraphic.drawCircle(0, 0, radius);
                this.game.layer.zDepth0.addChild(shapeGraphic);
                this.shapes.push(shapeGraphic);
            });
        }

        // Response group
        if (this.stepData.responses != undefined) {
            this.responseGroup = new ResponseFactory(this.game, this.stepData.repo, this.stepData.responses);
            let correctAnswer = 0,
                totalAnswer = this.responseGroup.children.length;
            // Drag stop event
            this.responseGroup.forEach((response) => {
                this.shapes.forEach((shape) => {
                    response.events.onDragStop.add(function(currentSprite) {
                        response.obj.checkOverlap(currentSprite, shape);
                    }, this);
                });
                response.obj.onDropped.add(function(){
                    correctAnswer++;
                    if (correctAnswer >= totalAnswer) {
                        this.finish.dispatch();
                    }
                }, this);
            });
        }
    }

    start(){
        // this.finishStep();
    }

    finishStep() {
        console.log("Finish step");
        this.finish.dispatch();
    }
}
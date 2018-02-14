"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";
import Canvas from "system/phaser/utils/PhaserManager";

import Phaser from 'phaser';
import {Signal} from 'phaser';

import Config from "../../config/data";

import ResponseFactory from "../Response/ResponseFactory";
import ImageFactory from "../Image/ImageFactory";
import QuestionFactory from "../Question/QuestionFactory";
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

        let xMargin = 300 * this.game.SCALE;
        let yMargin = 25 * this.game.SCALE;

        // Response title:
        this.title = game.add.text(this.game.world.centerX, 75 * this.game.SCALE, this.stepData.title, {
            font: 'Arial', 
            fontSize: 25*this.game.SCALE, 
            fill: '#000000', 
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.game.world.width - 650*this.game.SCALE
        });
        this.title.anchor.setTo(0.5);

        // Background
        if (this.stepData.background != undefined) {
            this.title.position.x += xMargin;
            this.background = new Background(
                this.game,
                this.game.world.centerX - xMargin,
                this.game.world.centerY,
                this.stepData.repo + this.stepData.background
            );
            this.game.layer.zDepth0.addChild(this.background.sprite);
            if (this.stepData.responses != undefined) {
                this.background.sprite.position.y += yMargin;
            }
        }

        // Shapes to answer
        let fill = false, // to fill or not
            radius = 75 * this.game.SCALE;
        if (this.stepData.shapes != undefined) {
            this.shapes = [];
            this.stepData.shapes.forEach((shape) => {
                let shapeGraphic = this.game.add.graphics(
                    this.background.sprite.position.x - shape.x * this.game.SCALE, 
                    this.background.sprite.position.y - shape.y * this.game.SCALE
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

        // Image group
        if (this.stepData.images != undefined) {
            this.imageGroup = new ImageFactory(this.game, this.stepData.repo, this.stepData.images, xMargin);
            let correctAnswer = 0,
                totalAnswer = 0;
            this.imageGroup.forEach((image) => {
                if (image.obj.correct) {
                    totalAnswer++;
                }
            });
            // Drag stop event
            this.imageGroup.forEach((image) => {
                image.events.onInputDown.add(function(){
                    if (image.obj.validate()) {
                        correctAnswer++;
                        if (correctAnswer >= totalAnswer) {
                            this.game.time.events.add(Phaser.Timer.SECOND * .75, this.finishStep,this);
                        }
                    }
                }, this);
            });
        }

        // Response group
        if (this.stepData.responses != undefined) {
            this.background.sprite.position.x += 2 * xMargin;
            this.responseGroup = new ResponseFactory(this.game, this.stepData.repo, this.stepData.responses, xMargin);
            let correctAnswer = 0,
                totalAnswer = 0;
            this.responseGroup.forEach((response) => {
                if (response.obj.isUsed) {
                    totalAnswer++;
                }
            });
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
                        this.game.time.events.add(Phaser.Timer.SECOND * .75, this.finishStep,this);
                    }
                }, this);
            });
        }

        // QCM
        if (this.stepData.qcm != undefined) {
            this.responseGroup = new QuestionFactory(this.game, this.stepData.qcm, xMargin);
            let correctAnswer = 0,
                totalAnswer = 0;
            this.responseGroup.forEach((response) => {
                if (response.obj.correct) {
                    totalAnswer++;
                }
            });
            this.responseGroup.forEach((response) => {
                response.events.onInputDown.add(function(){
                    if (response.obj.validate()) {
                        correctAnswer++;
                        if (correctAnswer >= totalAnswer) {
                            this.game.time.events.add(Phaser.Timer.SECOND * .75, this.finishStep,this);
                        }
                    }
                }, this);
            });
        }
    }

    finishStep() {
        this.title.destroy();
        if (this.stepData.background != undefined) {
            this.background.sprite.destroy();
        }
        if (this.stepData.shapes != undefined) {
            this.shapes.forEach((shape) => {
                shape.destroy();
            });
        }
        if (this.stepData.responses != undefined) {
            while(this.responseGroup.children[0]){
                this.responseGroup.children[0].destroy();
            }
        }
        if (this.stepData.images != undefined) {
            while(this.imageGroup.children[0]){
                this.imageGroup.children[0].destroy();
            }
        }
        if (this.stepData.qcm != undefined) {
            while(this.responseGroup.children[0]){
                this.responseGroup.children[0].destroy();
            }
        }
        this.finish.dispatch();
    }
}
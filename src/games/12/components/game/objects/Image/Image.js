"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";
import Phaser from 'phaser';
import {Signal} from "phaser";

import Config from "../../config/data";
import ImageSprite from "./ImageSprite";
import ResponseFactory from "../Response/ResponseFactory";

export default class Image extends BasicGameObject {

	game;
	shapes = [];
    lines = [];
    circle = [];
	finish = new Signal();

    constructor(game, x, y, data) {
        super(game);

        // Responses
        this.responseGroup = new ResponseFactory(game, Config.responses);

        // Image
        this.addSprite(new ImageSprite(this.game, x, y, data.key, this));
        this.sprite.scale.set(1.2 * game.SCALE);
        this.game.layer.zDepth0.addChild(this.sprite);

        // lines (arrows)
        this.lines = [];
        this.circles = [];
        
        if(data.lines){
            for(let line in data.lines) {
                // draw line
                this.lines[line] = this.game.add.graphics(x, y);
                this.game.layer.zDepth1.addChild(this.lines[line]);
                this.lines[line].lineStyle(6 * this.game.SCALE, 0x009306);
                this.lines[line].moveTo(data.lines[line].x1 * this.game.SCALE, data.lines[line].y1 * this.game.SCALE);
                this.lines[line].lineTo(data.lines[line].x2 * this.game.SCALE, data.lines[line].y2 * this.game.SCALE);
                //draw circle
                this.circles[line] = this.game.add.graphics(x,y);
                this.game.layer.zDepth1.addChild(this.circles[line]);
                this.circles[line].beginFill(0x009306, 1);
                this.circles[line].drawCircle(data.lines[line].x2 * this.game.SCALE, data.lines[line].y2 * this.game.SCALE, 15 * this.game.SCALE);
            }
        }
        
        // Shapes
        let fill = false, // To fill or not shapes
        	radius = 50 * game.SCALE,
        	shapesCount = 0,
        	answerCount = 0;

        this.shapes = [];

        for (let shape in data.shapes){
            // Create shapes
            this.shapes[shape] = this.game.add.graphics(x + data.shapes[shape].x * game.SCALE, y + data.shapes[shape].y * game.SCALE);
            this.game.layer.zDepth1.addChild(this.shapes[shape]);
            if (fill) {
                this.shapes[shape].beginFill(0xFF0000, 0.3);
            }
            this.shapes[shape].drawCircle(0, 0, radius);
            this.shapes[shape].correctAnswer = data.shapes[shape].correctAnswer;
            shapesCount++;
        }

        // Add actions
        this.responseGroup.forEach((response) => {
        	// Replace each responses
            response.initialize();
            // Correct answer -> check if is droped on correct place
            response.sprite.events.onDragStop.add(function(currentSprite){
                this.shapes.forEach((shape) => {
                    if (shape.correctAnswer != response.item.key) {
                        // Wrong anwser ...
                        if (response.checkOverlap(currentSprite, shape)){
                            // ... is droped
                            currentSprite.position.copyFrom(currentSprite.originalPosition);
                            PhaserManager.get('gabator').stats.changeValues({
                                health: PhaserManager.get('gabator').stats.state.health - 1,
                            });
                            Canvas.get('gabator').modal.showHelp(
                                "Mauvais type d'arrimage"
                            );
                        } else {
                            // ... is not droped
                            currentSprite.position.copyFrom(currentSprite.originalPosition);
                        }
                    } else {
                        // Good answer ...
                        if (response.checkOverlap(currentSprite, shape)){
                            // ... is droped
                            currentSprite.position.copyFrom(shape.position);
                            currentSprite.removeInputs();
                            // Not not move the answer for other shape control
                            currentSprite.originalPosition.copyFrom(shape.position);
                            // Answer count
                            answerCount++;
                            if (answerCount >= shapesCount) {
                                this.finish.dispatch();
                            }
                        } else {
                            // ... is not droped
                            currentSprite.position.copyFrom(currentSprite.originalPosition);
                        }
                    }
                });
            }, this);
        });

    }

    destroy(){
    	this.sprite.destroy();
        for(let line in this.lines){
            this.lines[line].destroy();
            this.circles[line].destroy();
        }
    	for (let shape in this.shapes){
        	this.shapes[shape].destroy();
        }
        this.responseGroup.forEach((response) => {
            response.destroy();
        });
    }

}
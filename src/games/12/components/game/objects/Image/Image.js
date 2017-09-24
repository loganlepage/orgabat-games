"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Phaser from 'phaser';
import {Signal} from "phaser";

import Config from "../../config/data";
import ImageSprite from "./ImageSprite";
import ResponseFactory from "../Response/ResponseFactory";

export default class Image extends BasicGameObject {

	game;
	shapes = [];
	finish = new Signal();

    constructor(game, x, y, data) {
        super(game);

        // Responses
        this.responseGroup = new ResponseFactory(game, Config.responses);
        // game.layer.zDepth2.addChild(this.responseGroup);

        // Image
        this.addSprite(new ImageSprite(this.game, x, y, data.key, this));
        this.sprite.scale.set(1.2 * game.SCALE);
        this.game.layer.zDepth0.addChild(this.sprite);

        // Shapes
        let fill = true, // To fill or not shapes
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
        	// if (this.shapes[data.shapes[shape].correctAnswer] == undefined) {
        	// 	// Create shapes
	        // 	this.shapes[data.shapes[shape].correctAnswer] = this.game.add.graphics(x + data.shapes[shape].x * game.SCALE, y + data.shapes[shape].y * game.SCALE);
	        // 	this.game.layer.zDepth1.addChild(this.shapes[data.shapes[shape].correctAnswer]);
	        // 	if (fill) {
		       //      this.shapes[data.shapes[shape].correctAnswer].beginFill(0xFF0000, 0.3);
		       //  }
		       //  this.shapes[data.shapes[shape].correctAnswer].drawCircle(0, 0, radius);
         //        this.shapes[data.shapes[shape].correctAnswer].correctAnswer = data.shapes[shape].correctAnswer;
		       //  shapesCount++;
        	// }
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
                // if(this.shapes[response.item.key] != undefined) {
                //     console.log("Correct");
                //     // Selected answer is needed
                //     if (response.checkOverlap(currentSprite, this.shapes[response.item.key])){
                //         // and droped
                //         console.log("Correct and droped");
                //         // currentSprite.position.x = this.shapes[response.item.key].position.x;
                //         // currentSprite.position.y = this.shapes[response.item.key].position.y;
                //         currentSprite.position.copyFrom(this.shapes[response.item.key].position);
                //         answerCount++;
                //         if (answerCount >= shapesCount) {
                //             this.finish.dispatch();
                //         }
                //     } else {
                //         // but not droped
                //         console.log("Correct but not droped");
                //         currentSprite.position.copyFrom(currentSprite.originalPosition);
                //         // this.shapes.forEach((shape) => {
                //         //     if(response.checkOverlap(currentSprite, this.shapes[shape])){
                //         //         console.log("Wrong answer 1");
                //         //         currentSprite.position.copyFrom(currentSprite.originalPosition);
                //         //         PhaserManager.get('gabator').stats.changeValues({
                //         //             health: PhaserManager.get('gabator').stats.state.health - 1,
                //         //         });
                //         //     } else {
                //         //         console.log("Wrong but not droped 1");
                //         //         currentSprite.position.copyFrom(currentSprite.originalPosition);
                //         //     }
                //         // });
                //     }
                // } else {
                //     console.log("Not Correct");
                //     // Selected answer is not needed
                //     currentSprite.position.copyFrom(currentSprite.originalPosition);
                //     console.log(this.shapes[0]);
                //     // for (let i = 0; i < this.shapes.length; i++) {
                //     //     console.log(this.shapes[i]);
                //     // }
                //     // this.shapes.forEach((shape) => {
                //     //     console.log('Shape');
                //     //     console.log(shape);
                //     // });
                //     // this.shapes.forEach((shape) => {
                //     //     console.log("Foreach");
                //     //     if(response.checkOverlap(currentSprite, this.shapes[shape])){
                //     //         // and droped
                //     //         console.log("Wrong answer 2");
                //     //         currentSprite.position.copyFrom(currentSprite.originalPosition);
                //     //         PhaserManager.get('gabator').stats.changeValues({
                //     //             health: PhaserManager.get('gabator').stats.state.health - 1,
                //     //         });
                //     //     } else {
                //     //         // and not droped
                //     //         console.log("Wrong but not droped 2");
                //     //         currentSprite.position.copyFrom(currentSprite.originalPosition);
                //     //     }
                //     // });
                // }
                // if(this.shapes[response.item.key] != undefined && response.checkOverlap(currentSprite, this.shapes[response.item.key])){
                //     currentSprite.position.x = this.shapes[response.item.key].position.x;
                //     currentSprite.position.y = this.shapes[response.item.key].position.y;
                //     answerCount++;
                //     if (answerCount >= shapesCount) {
                //         this.finish.dispatch();
                //     }
                // } else {
                //     console.log("Else 2");
                //     currentSprite.position.copyFrom(currentSprite.originalPosition);
                //         PhaserManager.get('gabator').stats.changeValues({
                //             health: PhaserManager.get('gabator').stats.state.health - 1,
                //         });
                // }
            }, this);
        });

    }

    destroy(){
    	this.sprite.destroy();
    	for (let shape in this.shapes){
        	this.shapes[shape].destroy();
        }
        this.responseGroup.forEach((response) => {
            response.destroy();
        });
    }

}
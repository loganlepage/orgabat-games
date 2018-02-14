"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";
import Canvas from "system/phaser/utils/PhaserManager";
import PhaserManager from 'system/phaser/utils/PhaserManager';

import BackgroundSprite from "./BackgroundSprite";

export default class Background extends BasicGameObject {

	game;
	shapes = [];
	finish = new Signal();

    constructor(game, data) {
        super(game);
        this.data = data;

        // Background image
        this.addSprite(new BackgroundSprite(this.game, this.game.world.centerX, this.game.world.centerY, data.key, this));
        this.sprite.scale.set(this.game.SCALE * 1.2);
        this.sprite.alpha = 0.6;
        this.game.layer.zDepth0.addChild(this.sprite);
         //To have pointer position
         /*this.sprite.events.onInputDown.add(function(){
             console.log("X: " + this.game.input.mousePointer.x / this.game.SCALE);
             console.log("Y: " + this.game.input.mousePointer.y / this.game.SCALE);
             console.log("---");
         },this);*/

        // Title:
        this.title = this.game.add.text(
            60 * this.game.SCALE, 
            20 * this.game.SCALE, 
            this.data.title, 
            {
                font: 'Arial', 
                fontSize: 30 * this.game.SCALE, 
                fill: '#000000', 
                backgroundColor: 'rgba(255,255,255,0.85)',
                wordWrap: true,
                wordWrapWidth: this.game.world.width - 50 * this.game.SCALE
            }
        );
        this.game.layer.zDepth0.addChild(this.title);

        // Start point
        let fill = true,
            radius = 100 * this.game.SCALE;
        // Shape
        this.startPoint = this.game.add.graphics(this.data.start.x * this.game.SCALE, this.data.start.y * this.game.SCALE);
        if (fill) {
            this.startPoint.lineStyle(2, 0x000000, 1);
            this.startPoint.beginFill(0x008000, .2);
        }
        this.startPoint.drawCircle(0, 0, radius);
        // Title
        this.startPoint.titleText = this.game.add.text(
            (this.data.start.x) * this.game.SCALE, 
            (this.data.start.y + this.startPoint.height / 2 + 30) * this.game.SCALE, 
            this.data.start.title, 
            {
                font: 'Arial', 
                fontSize: 25 * game.SCALE, 
                fill: '#000000', 
                backgroundColor: 'rgba(255,255,255,0.85)'
            }
        );
        this.startPoint.titleText.anchor.setTo(0.5, 0);
        // Add to game
        this.game.layer.zDepth0.addChild(this.startPoint);
        this.game.layer.zDepth0.addChild(this.startPoint.titleText);

        // Work area:
        // Shape
        this.workArea = this.game.add.graphics(this.data.work.x * this.game.SCALE, this.data.work.y * this.game.SCALE);
        if (fill) {
            this.workArea.lineStyle(2, 0x000000, 1);
            this.workArea.beginFill(0x008000, .2);
        }
        this.workArea.drawCircle(0, 0, radius);
        // Title
        this.workArea.titleText = this.game.add.text(
            (this.data.work.x) * this.game.SCALE, 
            (this.data.work.y + this.workArea.height / 2 + 30) * this.game.SCALE, 
            this.data.work.title, 
            {
                font: 'Arial', 
                fontSize: 25 * game.SCALE, 
                fill: '#000000', 
                backgroundColor: 'rgba(255,255,255,0.85)'
            }
        );
        this.workArea.titleText.anchor.setTo(0.5, 0);
        // Add to game
        this.game.layer.zDepth0.addChild(this.workArea);
        this.game.layer.zDepth0.addChild(this.workArea.titleText);

        // Shapes
        this.shapes = [];
        this.currentPosition = 1;
        this.createStep();
        // Actions
        this.answerCount = 0;
        this.answerMax = 0;
        this.positionMax = 0;
        this.data.area.forEach((shape) => {
            if (shape.correctAnswer) {
                this.answerMax++;
            }
            if (shape.position > this.positionMax){
                this.positionMax = shape.position;
            }
        });
        this.addActions();
    }

    createStep(){
        for (let shapeNumber in this.data.area){
            if (this.data.area[shapeNumber].position == this.currentPosition) {
                // Create step shapes
                this.createShapes(shapeNumber, "white");
                this.shapes[shapeNumber].inputEnabled = true;
                this.shapes[shapeNumber].input.useHandCursor = true;
            }
        }
    }

    createShapes(shapeNumber, color) {
        let fill = true,
        radius = 50 * this.game.SCALE;
        // shape
        this.shapes[shapeNumber] = this.game.add.graphics(this.data.area[shapeNumber].x * this.game.SCALE, this.data.area[shapeNumber].y * this.game.SCALE);
        this.shapes[shapeNumber].shapeNumber = shapeNumber;
        this.shapes[shapeNumber].data = this.data.area[shapeNumber];
        if (fill) {
            this.shapes[shapeNumber].lineStyle(2, 0x000000, 1);
            if (color == "green") {
                this.shapes[shapeNumber].beginFill(0x008000, .6);
            } else if (color == "red") {
                this.shapes[shapeNumber].beginFill(0xFF0000, .6);
            } else {
                this.shapes[shapeNumber].beginFill(0x1551C3, .6);
            }
        }
        this.shapes[shapeNumber].drawCircle(0, 0, radius);
        // Title
        this.shapes[shapeNumber].titleText = this.game.add.text(
            (this.data.area[shapeNumber].x) * this.game.SCALE, 
            (this.data.area[shapeNumber].y + this.shapes[shapeNumber].height / 2 + 25) * this.game.SCALE, 
            this.data.area[shapeNumber].title, 
            {
                font: 'Arial', 
                fontSize: 20 * this.game.SCALE, 
                fill: '#000000', 
                backgroundColor: 'rgba(255,255,255,0.9)'
            }
        );
        this.shapes[shapeNumber].titleText.anchor.setTo(0.5, 0);
        this.game.layer.zDepth0.addChild(this.shapes[shapeNumber]);
        this.game.layer.zDepth0.addChild(this.shapes[shapeNumber].titleText);
    }

    addActions() {
        this.shapes.forEach((shape) => {
            // Remove events on other step shapes
            if (shape.data.position != this.currentPosition) {
                shape.events.onInputDown.removeAll();
                shape.inputEnabled = false;
                if(shape.data.correctAnswer == false){
                    shape.destroy();
                    shape.titleText.destroy();
                }
            }
            // Add envents only on current step shapes
            if (shape.data.position == this.currentPosition) {
                shape.events.onInputDown.add(function(){
                    if (shape.data.correctAnswer && shape.data.position == this.currentPosition) {
                        // Correct answer
                        this.validate(parseInt(shape.shapeNumber));
                    } else if (shape.data.position < this.currentPosition) {
                        // Click on previous step shape, never catch
                    } else {
                        this.unvalidate(parseInt(shape.shapeNumber));
                        Canvas.get('gabator').modal.showHelp(
                            "Il ne faut pas passer par ici"
                        );
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                    }
                },this);
            }
        });
    }

    validate(shapeNumber) {
        // Validate current shape
        this.shapes[shapeNumber].titleText.destroy();
        this.shapes[shapeNumber].destroy();
        this.createShapes(shapeNumber, "green");
        // Update infos
        this.answerCount++;
        this.currentPosition++;
        // Finish control
        if (this.answerCount >= this.answerMax) {
            // Finish event
            this.finish.dispatch();
        } else {
            // Create next step
            this.createStep();
            this.addActions();
        } 
    }

    unvalidate(shapeNumber) {
        this.shapes[shapeNumber].titleText.destroy();
        this.shapes[shapeNumber].destroy();
        this.createShapes(shapeNumber, "red");
    }

    destroy(){
        this.title.destroy();
        this.startPoint.titleText.destroy();
        this.startPoint.destroy();
        this.workArea.titleText.destroy();
        this.workArea.destroy();
    	this.sprite.destroy();
    	for (let shape in this.shapes){
            this.shapes[shape].titleText.destroy();
        	this.shapes[shape].destroy();
        }
    }

}
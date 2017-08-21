"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import BackgroundSprite from "./BackgroundSprite";

export default class Background extends BasicGameObject {

	game;
	shapes = [];
	finish = new Signal();

    constructor(game, data) {
        super(game);
        this.data = data;

        // Title:
        this.title = this.game.add.text(
            60 * game.SCALE, 
            20 * game.SCALE, 
            this.data.title, 
            {font: 'Arial', fontSize: 30 * game.SCALE, fill: '#000000'}
        );

        // Background image
        this.addSprite(new BackgroundSprite(this.game, this.game.world.centerX, this.game.world.centerY, data.key, this));
        this.sprite.scale.set(0.95 * game.SCALE);
        this.game.layer.zDepth0.addChild(this.sprite);
        // To have pointer position
        this.sprite.events.onInputDown.add(function(){
            console.log("X: " + this.game.input.mousePointer.x / this.game.SCALE);
            console.log("Y: " + this.game.input.mousePointer.y / this.game.SCALE);
            console.log("---");
        },this);

        // Work area:
        let fill = true,
            radius = 100;
        this.workArea = this.game.add.graphics(this.data.work.x * this.game.SCALE, this.data.work.y * this.game.SCALE);
        if (fill) {
            this.workArea.lineStyle(2, 0x000000, 1);
            this.workArea.beginFill(0xFF0000, .2);
        }
        this.workArea.drawCircle(0, 0, radius);
        this.workArea.title = this.game.add.text(
            (this.workArea.x + 50) * this.game.SCALE, 
            (this.workArea.y + 50) * this.game.SCALE, 
            this.workArea.title, 
            {font: 'Arial', fontSize: 30 * game.SCALE, fill: '#FF0000'}
        );
        this.game.layer.zDepth0.addChild(this.workArea);

        // Shapes
        this.shapes = [];

        for (let shapeNumber in this.data.area){
    		// Create shapes
            this.createShapes(shapeNumber, "white");
            this.shapes[shapeNumber].inputEnabled = true;
            this.shapes[shapeNumber].input.useHandCursor = true;
        }
    }

    createShapes(shapeNumber, color) {
        let fill = true,
            radius = 100;
        this.shapes[shapeNumber] = this.game.add.graphics(this.data.area[shapeNumber].x * this.game.SCALE, this.data.area[shapeNumber].y * this.game.SCALE);
        this.shapes[shapeNumber].shapeNumber = shapeNumber;
        this.shapes[shapeNumber].data = this.data.area[shapeNumber];
        if (fill) {
            this.shapes[shapeNumber].lineStyle(2, 0x000000, 1);
            if (color == "green") {
                this.shapes[shapeNumber].beginFill(0x008000, .5);
            } else {
                this.shapes[shapeNumber].beginFill(0x1551C3, .2);
            }
        }
        this.shapes[shapeNumber].drawCircle(0, 0, radius);
        this.shapes[shapeNumber].title = this.game.add.text(
            (this.data.area[shapeNumber].x + 50) * this.game.SCALE, 
            (this.data.area[shapeNumber].y + 50) * this.game.SCALE, 
            this.data.area[shapeNumber].title, 
            {font: 'Arial', fontSize: 30 * game.SCALE, fill: '#000000'}
        );
        this.game.layer.zDepth0.addChild(this.shapes[shapeNumber]);
    }

    validate(shapeNumber) {
        this.shapes[shapeNumber].destroy();
        this.createShapes(shapeNumber, "green");
    }

    destroy(){
    	this.sprite.destroy();
    	for (let shape in this.shapes){
        	this.shapes[shape].destroy();
        }
    }

}
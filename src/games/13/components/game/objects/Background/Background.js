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
        this.data = data.area;

        // Background
        this.addSprite(new BackgroundSprite(this.game, this.game.world.centerX, this.game.world.centerY, data.key, this));
        // this.sprite.scale.set(0.95 * game.SCALE);
        this.sprite.scale.set(game.SCALE);
        this.game.layer.zDepth0.addChild(this.sprite);
        // To have pointe rposition
        this.sprite.events.onInputDown.add(function(){
            // console.log("X: " + this.game.input.mousePointer.x / this.game.SCALE + " Y: " + this.game.input.mousePointer.y / this.game.SCALE);
            console.log((this.game.input.mousePointer.x - this.game.world.centerX)/ this.game.SCALE + " / " + (this.game.input.mousePointer.y - this.game.world.centerY)/ this.game.SCALE);
            console.log("---");
        }, this);

        // Shapes
        this.shapes = [];

        for (let shape in this.data){
    		// Create shapes
            this.createShapes(shape, "white");
        }
    }

    createShapes(shapeNumber, color) {
        let fill = true,
            radius = 100;
        try {
            this.shapes[shapeNumber].destroy();
        } catch (e) {
            //
        }
        this.shapes[shapeNumber] = this.game.add.graphics(
            this.game.world.centerX + this.data[shapeNumber].x * this.game.SCALE,
            this.game.world.centerY + this.data[shapeNumber].y * this.game.SCALE
        );
        this.shapes[shapeNumber].shapeNumber = shapeNumber;
        this.shapes[shapeNumber].data = this.data[shapeNumber];
        if (fill) {
            this.shapes[shapeNumber].lineStyle(2, 0x000000, 1);
            if (color == "green") {
                this.shapes[shapeNumber].beginFill(0x008000, .6);
            } else if (color == "orange"){
                this.shapes[shapeNumber].beginFill(0xFFA500, .5);
            } else {
                this.shapes[shapeNumber].beginFill(0xffffff, .2);
                this.shapes[shapeNumber].inputEnabled = true;
                this.shapes[shapeNumber].input.useHandCursor = true;
            }
        }
        this.shapes[shapeNumber].drawCircle(0, 0, radius);
        this.game.layer.zDepth0.addChild(this.shapes[shapeNumber]);
    }

    validate(shapeNumber) {
        this.shapes[shapeNumber].destroy();
        this.createShapes(shapeNumber, "green");
    }

    check(shapeNumber) {
        // this.shapes[shapeNumber].destroy();
        this.createShapes(shapeNumber, "orange");
    }

    removeSpecificInputs(shapeNumber) {
        this.shapes[shapeNumber].inputEnabled = false;
    }

    removeInputs() {
        for (let shape in this.shapes) {
            this.shapes[shape].inputEnabled = false;
        }
    }

    addInputs() {
        for (let shape in this.shapes) {
            this.shapes[shape].inputEnabled = true;
            this.shapes[shape].input.useHandCursor = true;
        }
    }

    destroy(){
    	this.sprite.destroy();
    	for (let shape in this.shapes){
        	this.shapes[shape].destroy();
        }
    }

}
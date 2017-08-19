"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ImageSprite from "./ImageSprite";

export default class Image extends BasicGameObject {

	game;
	shapes = [];

    constructor(game, x, y, data, responseGroup) {
        super(game);

        // Image
        this.addSprite(new ImageSprite(this.game, x, y, data.key, this));
        this.sprite.scale.set(1.2 * game.SCALE);
        this.game.layer.zDepth0.addChild(this.sprite);

        // Shapes
        let fill = true, // To fill or not shapes
        	radius = 30;

        this.shapes = [];

        for (let shape in data.shapes){
        	// Create shapes
        	this.shapes[data.shapes[shape].correctAnswer] = this.game.add.graphics(x + data.shapes[shape].x * game.SCALE, y + data.shapes[shape].y * game.SCALE);
        	this.game.layer.zDepth1.addChild(this.shapes[data.shapes[shape].correctAnswer]);
        	if (fill) {
	            this.shapes[data.shapes[shape].correctAnswer].beginFill(0xFF0000, .5);
	        }
	        this.shapes[data.shapes[shape].correctAnswer].drawCircle(0, 0, radius);
        }

        // Add actions
        responseGroup.forEach((item) => {
        	// Replace each responses
            item.obj.initialize();
            // Correct answer -> check if is droped on correct place
            for (let shape in this.shapes) {
            	if (item.obj.item.key == shape) {
            		console.log("OK");
	            	item.events.onDragStop.add(function(currentSprite){
	            		console.log("Drop");
		                item.obj.checkOverlap(currentSprite, this.shapes[shape]);
		            }, this);
		        // Wrong answer
	            } else {
	            	//
	            }
            }
        });

    }

    destroy(){
    	this.sprite.destroy();
    	this.shapes.map(function(shape) {
            return shape.destroy();
        });
    }

}
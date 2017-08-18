"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ImageSprite from "./ImageSprite";

export default class Image extends BasicGameObject {

	game;
	shapes = [];

    constructor(game, x, y, data) {
        super(game);

        // Image
        this.addSprite(new ImageSprite(this.game, x, y, data.key, this));
        this.sprite.scale.set(1.2 * game.SCALE);
        this.game.layer.zDepth0.addChild(this.sprite);

        // Shapes
        let fill = true, // To fill or not shapes
        	radius = 30;

        for (let shape in data.shapes){
        	this.shapes[shape] = this.game.add.graphics(x, y);
        	this.game.layer.zDepth1.addChild(this.shapes[shape]);
        	if (fill) {
	            this.shapes[shape].beginFill(0xFF0000, .5);
	        }
	        this.shapes[shape].drawCircle(data.shapes[shape].x * game.SCALE, data.shapes[shape].y * game.SCALE, radius);
        }

        this.sprite.events.onInputDown.add(function(){ // Click to have pointer position
        	console.log("X:" + (this.game.input.mousePointer.x - this.sprite.position.x)/game.SCALE);
        	console.log("Y:" + (this.game.input.mousePointer.y - this.sprite.position.y)/game.SCALE);
        	console.log("---");
        },this);

    }

    destroy(){
    	this.sprite.destroy();
    	this.shapes.map(function(shape) {
            return shape.destroy();
        });
    }

}
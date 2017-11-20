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
        this.sprite.scale.set(0.9 * this.game.SCALE);
        this.game.layer.zDepth0.addChild(this.sprite);
        // To have pointer position
        this.sprite.events.onInputDown.add(function(){
            console.log("X: " + (this.game.input.mousePointer.x - this.game.world.centerX)/this.game.SCALE);
            console.log("Y: " + (this.game.input.mousePointer.y - this.game.world.centerY)/this.game.SCALE);
            console.log("---");
        },this);

        // Shapes
        this.shapes = [];
        for (let shapeNumber in this.data.area){
            // Create step shapes
            let fill = true,
            radius = 50 * this.game.SCALE;
            // shape
            this.shapes[shapeNumber] = this.game.add.graphics(
                this.game.world.centerX + this.data.area[shapeNumber].x * this.game.SCALE, 
                this.game.world.centerY + this.data.area[shapeNumber].y * this.game.SCALE
            );
            this.shapes[shapeNumber].data = this.data.area[shapeNumber];
            // Fill or not
            if (fill) {
                this.shapes[shapeNumber].lineStyle(1, 0x000000, 1);
                this.shapes[shapeNumber].beginFill(0xFFA500, .5);
            }
            // Draw circle
            this.shapes[shapeNumber].drawCircle(0, 0, radius);
            // Add to game
            this.game.layer.zDepth0.addChild(this.shapes[shapeNumber]);
        }
    }

    destroy(){
        this.title.destroy();
    	this.sprite.destroy();
    	for (let shape in this.shapes){
        	this.shapes[shape].destroy();
        }
    }

}
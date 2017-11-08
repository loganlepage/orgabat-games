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

        // Background image
        this.addSprite(new BackgroundSprite(
            this.game, 
            this.game.world.centerX, 
            this.game.world.centerY - 100 * this.game.SCALE, 
            data.key, this)
        );
        this.game.layer.zDepth0.addChild(this.sprite);

        // Title:
        this.title = this.game.add.text(
            this.game.world.centerX, 
            30 * this.game.SCALE, 
            data.title, 
            {
                font: 'Arial', 
                fontSize: 30 * this.game.SCALE, 
                fill: '#000000',
                align: 'center'
            }
        );
        this.title.anchor.setTo(0.5);
        this.game.layer.zDepth0.addChild(this.title);

    }

}
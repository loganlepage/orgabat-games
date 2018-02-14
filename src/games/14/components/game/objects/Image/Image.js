"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";
import Canvas from "system/phaser/utils/PhaserManager";
import PhaserManager from 'system/phaser/utils/PhaserManager';

import ImageSprite from "./ImageSprite";

export default class Image extends BasicGameObject {

	game;

    constructor(game, y, data) {
        super(game);
        this.data = data;

        // Image
        // this.addSprite(new ImageSprite(this.game, this.game.world.centerX, this.game.world.centerY, data.key, this));
        this.addSprite(new ImageSprite(this.game, this.game.world.centerX/2, y, data.key, this));
        this.sprite.scale.set(this.game.SCALE * .5);
        this.game.layer.zDepth0.addChild(this.sprite);
    }

}
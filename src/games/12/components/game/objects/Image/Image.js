"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ImageSprite from "./ImageSprite";

export default class Image extends BasicGameObject {

    constructor(game, x, y, key) {
        super(game);
        this.addSprite(new ImageSprite(this.game, x, y, key, this));
    }

}
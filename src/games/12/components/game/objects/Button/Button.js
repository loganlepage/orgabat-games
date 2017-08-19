"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';

import ButtonSprite from "./ButtonSprite";

export default class Button extends BasicGameObject {

    constructor(game, x, y, key) {
        super(game);
        this.addSprite(new ButtonSprite(this.game,x,y,key,this));
    }

    destroy() {
    	this.sprite.destroy();
    }
}
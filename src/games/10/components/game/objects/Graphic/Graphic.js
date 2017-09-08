"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';

export default class Graphic extends BasicGameObject {
    constructor(game, x, y, width, height) {
        super(game);
        this.graphic = game.add.graphics(0,0);
        this.graphic.beginFill(0xCCCCCC, 1);
        this.graphic.boundsPadding = 0;
        this.graphic.drawRect(x, y, width, height); 
    }
}
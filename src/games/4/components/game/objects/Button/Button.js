"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ButtonSprite from "./ButtonSprite";
import Phaser from 'phaser';

export default class Button extends BasicGameObject {
    ready = false;

constructor(game, x, y) {
    super(game);
    this.addSprite(new ButtonSprite(
        this.game,
        x,
        y,
        null,
        this
    ));
    this.ready = true;
}
}
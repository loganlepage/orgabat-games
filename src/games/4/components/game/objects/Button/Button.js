"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ButtonSprite from "./ButtonSprite";
import Phaser from 'phaser';

export default class Button extends BasicGameObject {
    ready = false;

	constructor({game, x, y, key}) {
	    super(game);
	    this.addSprite(new ButtonSprite({
	        game: this.game,
	        x: x,
	        y: y,
	        key: key,
	        buttonObj: this
	    }));
	    this.ready = true;
	}

	destroy() {
		this.sprite.destroy();
	}
}
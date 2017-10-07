"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';

import ModalSprite from "./ModalSprite";
import CheckBox from "../List/CheckBox";
import Button from "../Button/Button";

export default class ListModal extends BasicGameObject {

	blackBackground;
	texts = [];
	checkbox = [];
	cross;
	button;

	finish = new Phaser.Signal();

	constructor(game, x, y, key, title, states, element) {
	    super(game);

	    // Create black background
	    this.blackBackground = this.game.add.graphics(0,0);
        this.game.layer.zDepth1.addChild(this.blackBackground);
        this.blackBackground.lineStyle(0, "balck", 0);
        this.blackBackground.beginFill("black", 0.5);
        this.blackBackground.drawRect(0, 0, this.game.world.width, this.game.world.height);

        // Modal image
	    this.addSprite(new ModalSprite(this.game, x, y, key, this));

	    // Texts array
	    this.texts = [];

	    // Fonts size
	    let bigFont = 24 * this.game.SCALE,
	    	mediumFont = 20 * this.game.SCALE;

	    // Title
	    let textPositionX = x - (this.sprite.width/2) + 40 * this.game.SCALE,
	    	textPositionY = y - (this.sprite.height/2) + 40 * this.game.SCALE,
	    	titleText = this.game.add.text(
	    		textPositionX, 
	    		textPositionY, 
	    		title, 
	    		{fill: '#000000', fontSize: bigFont}
	    	);
	    this.texts.push(titleText);
	    // textPositionY += 20 * this.game.SCALE;

	    // Elements in the list
	    states.forEach((error) => {
	    	textPositionY += (50 * this.game.SCALE);
	    	// Checkbox
	    	this.checkbox.push(new CheckBox(
	    		this.game, 
	    		textPositionX, 
	    		textPositionY,
	    		error.title,
	    		element
	    	));
	    });

	    // Validate button
	    this.button = new Button(
	    	this.game, 
	    	x + (this.sprite.width/2) - (70 * this.game.SCALE),
	    	y + (this.sprite.height/2) - (45 * this.game.SCALE),
	    	"continue",
	    	this
	    	);
	    this.button.sprite.events.onInputDown.add(function(){
	    	this.finish.dispatch();
	    	this.removeElements();
	    }, this);
	}

	removeElements() {
		this.blackBackground.destroy();
		this.sprite.destroy();
		this.checkbox.forEach((item) => {
			item.destroy();
		});
		this.checkbox = [];
		this.button.sprite.destroy();
		this.button = null;
		this.texts.forEach((text) => {
			text.destroy();
		});
	}
}













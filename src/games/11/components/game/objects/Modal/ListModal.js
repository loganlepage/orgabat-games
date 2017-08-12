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
	constructor(game, x, y, key, title, item, states) {
	    super(game);

	    // Create black background
	    this.blackBackground = this.game.add.graphics(0,0);
        this.game.layer.zDepth1.addChild(this.blackBackground);
        this.blackBackground.lineStyle(0, "balck", 0);
        this.blackBackground.beginFill("black", 0.4);
        this.blackBackground.drawRect(0, 0, this.game.world.width, this.game.world.height);

        // Modal image
	    this.addSprite(new ModalSprite(this.game, x, y, key, this));

	    // Tableau de texte, pour supprimer facilement
	    this.texts = [];

	    // Fonts size
	    let bigFont = 24 * this.game.SCALE,
	    	mediumFont = 20 * this.game.SCALE;

	    // Title
	    let textPositionX = x - (this.sprite.width/2) + 20,
	    	textPositionY = y - (this.sprite.height/2) + 20,
	    	titleText = this.game.add.text(
	    		textPositionX, 
	    		textPositionY, 
	    		title, 
	    		{fill: '#000000', fontSize: bigFont}
	    	);
	    this.texts.push(titleText);
	    textPositionY += 20;

	    // Elements in the list
	    states.forEach((error) => {
	    	textPositionY += 30;
	    	// Text
	    	this.texts.push(this.game.add.text(
	    		textPositionX + 20, 
	    		textPositionY, 
	    		error.title, 
	    		{fill: '#000000', fontSize: mediumFont}
	    	));
	    	// Checkbox
	    	this.checkbox.push(new CheckBox(
	    		this.game, 
	    		textPositionX, 
	    		textPositionY, 
	    		"list"
	    	));
	    });

	    console.log(this.checkbox);

	    // Validate button
	    this.button = new Button(
	    	this.game, 
	    	x + (this.sprite.width/2) - 50,
	    	y + (this.sprite.height/2) - 20,
	    	"continue",
	    	this
	    	);
	    this.button.sprite.events.onInputDown.add(function(){
	    	this.removeElements();
	    }, this);

	    // Create cross to close modal
	    let crossX = this.game.world.centerX + (this.sprite.width/2) - 40,
	    	crossY = this.game.world.centerY - (this.sprite.height/2) + 20,
	    	crossWidth = 20;
	    this.cross = this.game.add.graphics(0,0);
	    this.cross.lineStyle(2, "black", 1);
        this.cross.moveTo(crossX,crossY);
        this.cross.lineTo(crossX + crossWidth, crossY + crossWidth);
        this.cross.moveTo(crossX + crossWidth,crossY);
        this.cross.lineTo(crossX, crossY + crossWidth);
        this.cross.inputEnabled = true;
        this.cross.input.useHandCursor = true;
        this.cross.events.onInputDown.add(this.removeElements, this);
	}

	removeElements() {
		this.blackBackground.destroy();
		this.sprite.destroy();
		this.cross.destroy();
		this.checkbox.forEach((item) => {
			item.sprite.destroy();
		});
		this.checkbox = [];
		this.button.sprite.destroy();
		this.button = null;
		this.texts.forEach((text) => {
			text.destroy();
		});
	}
}













"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ModalSprite from "./ModalSprite";
import Phaser from 'phaser';

export default class ItemModal extends BasicGameObject {

	texts = [];
	title;
	cross;

	constructor(game, x, y, key, title, item) {
	    super(game);

	    // Create black background
	    this.blackBackground = this.game.add.graphics(0,0);
        this.game.layer.zDepth1.addChild(this.blackBackground);
        this.blackBackground.lineStyle(0, "balck", 0);
        this.blackBackground.beginFill("black", 0.5);
        this.blackBackground.drawRect(0, 0, this.game.world.width, this.game.world.height);

        // Modal image
	    this.addSprite(new ModalSprite(this.game, x, y, key, this));
	    this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;

	    // Tableau de texte, pour supprimer facilement
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
	    		{fill: '#000000', fontSize: bigFont});
	    this.texts.push(titleText);
	    textPositionY += 30 * this.game.SCALE;

	    // Item informations
	    if (item.name != undefined) {
	    	textPositionY += 30 * this.game.SCALE;
	    	let nameText = this.game.add.text(
	    		textPositionX, textPositionY, 
	    		"Nom: " + item.name, 
	    		{fill: '#000000', fontSize: mediumFont});
	    	this.texts.push(nameText);
	    }
	    if (item.quantity > 0) {
	    	textPositionY += 30 * this.game.SCALE;
	    	let quantityText = this.game.add.text(
	    		textPositionX, textPositionY, 
	    		"Quantité: " + item.quantity, 
	    		{fill: '#000000', fontSize: mediumFont});
	    	this.texts.push(quantityText);
	    }
	    if (item.dimensions != "") {
	    	textPositionY += 30 * this.game.SCALE;
	    	let dimensionText = this.game.add.text(
	    		textPositionX, 
	    		textPositionY, 
	    		"Dimensions: " + item.dimensions, 
	    		{fill: '#000000', fontSize: mediumFont});
	    	this.texts.push(dimensionText);
	    }
	    if (item.note != "") {
	    	textPositionY += 30 * this.game.SCALE;
	    	let noteText = this.game.add.text(
	    		textPositionX, textPositionY, 
	    		"Note: " + item.note, 
	    		{fill: '#000000', fontSize: mediumFont});
	    	this.texts.push(noteText);
	    }

	    // Create cross to close modal
	    let crossWidth = 20 * this.game.SCALE,
	    	crossX = this.game.world.centerX + (this.sprite.width/2) - crossWidth - (40 * this.game.SCALE),
	    	crossY = this.game.world.centerY - (this.sprite.height/2) + crossWidth/2 + (20 * this.game.SCALE);

	    this.cross = this.game.add.graphics(0,0);
	    this.cross.lineStyle(2, "black", 1);
        this.cross.moveTo(crossX,crossY);
        this.cross.lineTo(crossX + crossWidth, crossY + crossWidth);
        this.cross.moveTo(crossX + crossWidth,crossY);
        this.cross.lineTo(crossX, crossY + crossWidth);
	}

	removeElements() {
		this.blackBackground.destroy();
		this.cross.destroy();
		this.texts.forEach((text) => {
			text.destroy();
		});
	}
}













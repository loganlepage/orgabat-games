"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ModalSprite from "./ModalSprite";
import Phaser from 'phaser';

export default class Modal extends BasicGameObject {

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

	    // Tableau de texte, pour supprimer facilement
	    this.texts = [];

	    // Title
	    let textPositionX = x - (this.sprite.width/2) + 20,
	    	textPositionY = y - (this.sprite.height/2) + 20,
	    	titleText = this.game.add.text(textPositionX, textPositionY, title, {fill: '#000000', fontSize: 20});
	    this.texts.push(titleText);
	    textPositionY += 20;

	    // Item informations
	    if (item.quantity > 0) {
	    	textPositionY += 20;
	    	let quantityText = this.game.add.text(textPositionX, textPositionY, "Quantité: " + item.quantity, {fill: '#000000', fontSize: 16});
	    	this.texts.push(quantityText);
	    }
	    if (item.dimensions != "") {
	    	textPositionY += 20;
	    	let dimensionText = this.game.add.text(textPositionX, textPositionY, "Dimensions: " + item.dimensions, {fill: '#000000', fontSize: 16});
	    	this.texts.push(dimensionText);
	    }
	    if (item.note != "") {
	    	textPositionY += 20;
	    	let noteText = this.game.add.text(textPositionX, textPositionY, "Note: " + item.note, {fill: '#000000', fontSize: 16});
	    	this.texts.push(noteText);
	    }

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
	}

	removeElements() {
		this.blackBackground.destroy();
		this.cross.destroy();
		this.texts.forEach((text) => {
			text.destroy();
		});
	}
}













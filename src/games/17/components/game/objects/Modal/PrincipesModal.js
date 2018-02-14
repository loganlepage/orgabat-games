"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ModalSprite from "./ModalSprite";
import Phaser from 'phaser';

export default class PrincipesModal extends BasicGameObject {

	texts = [];
	onClosed = new Phaser.Signal();

	constructor(game, title, principes) {

	    super(game);

	    this.x = this.game.world.centerX;
	    this.y = this.game.world.centerY;

	    // Create black background
	    this.blackBackground = this.game.add.graphics(0,0);
        this.game.layer.zDepth1.addChild(this.blackBackground);
        this.blackBackground.lineStyle(0, "balck", 0);
        this.blackBackground.beginFill("black", 0.5);
        this.blackBackground.drawRect(0, 0, this.game.world.width, this.game.world.height);
        this.blackBackground.inputEnabled = true;
        this.blackBackground.input.useHandCursor = true;

        // Modal image
	    this.addSprite(new ModalSprite(this.game, this.x, this.y, "full_modal", this));

	    // Texts array, to remove easily
	    this.texts = [];

	    // Fonts size
	    let bigFont = 24 * this.game.SCALE,
	    	mediumFont = 18 * this.game.SCALE;

	    // Title
	    let textPositionX = this.game.world.centerX,
	    	textPositionY = this.game.world.centerY - (this.sprite.height/2) + 50 * this.game.SCALE;

	    this.titleText = this.game.add.text(
    		textPositionX, 
	    	textPositionY, 
	    	title, 
	    	{
	    		fill: '#000000',
	    		fontSize: bigFont, 
	    		align: "center", 
	    		wordWrap: true, 
	    		wordWrapWidth: this.sprite.width - 80 * this.game.SCALE
	    	});
	    this.titleText.anchor.setTo(0.5);
	    this.texts.push(this.titleText);

	    // Informations
	    textPositionX = this.game.world.centerX - this.sprite.width / 2 + 50 * this.game.SCALE;
	    textPositionY = this.game.world.centerY - this.sprite.height / 2 + this.titleText.height + 50 * this.game.SCALE;
	    for(let item in principes.preventions){
	    	let text = this.game.add.text(
	    		textPositionX, 
	    		textPositionY, 
	    		principes.preventions[item],
	    		{fill: '#666666', fontSize: mediumFont, align: "left", wordWrap: true, wordWrapWidth: this.sprite.width - 100 * this.game.SCALE});
	    	text.anchor.setTo(0);
	    	this.texts.push(text);
	    	textPositionY+= text.height + 20 * this.game.SCALE;
	    }

	    this.hide();
	}

	hide(){
		this.texts.forEach((item) => {
			item.visible = false;
		});
	    this.blackBackground.visible = false;
	    this.sprite.visible = false;
	}

	show(){
		this.texts.forEach((item) => {
			item.visible = true;
		});
	    this.blackBackground.visible = true;
	    this.sprite.visible = true;
	    this.blackBackground.events.onInputDown.add(function(){
            this.removeElements();
        }, this);
	}

	removeElements() {
		this.onClosed.dispatch();
		this.hide();
	}
}













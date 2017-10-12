"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ModalSprite from "./ModalSprite";
import Phaser from 'phaser';

export default class QuestionModal extends BasicGameObject {

	texts = [];
	onClosed = new Phaser.Signal();

	constructor(game, title, responses) {

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
	    	mediumFont = 20 * this.game.SCALE;

	    // Title
	    let textPositionX = this.game.world.centerX,
	    	textPositionY = this.y - (this.sprite.height/2) + 75 * this.game.SCALE;
	    this.titleText = this.game.add.text(
	    		textPositionX, 
	    		textPositionY, 
	    		title, 
	    		{fill: '#000000', fontSize: bigFont, align: "center", wordWrap: true, wordWrapWidth: this.sprite.width - 80 * this.game.SCALE});
	    this.titleText.anchor.setTo(0.5);
	    this.texts.push(this.titleText);
	    textPositionY += 30 * this.game.SCALE;

	    this.hide();
	}

	hide(){
		this.titleText.visible = false;
	    this.blackBackground.visible = false;
	    this.sprite.visible = false;
	}

	show(){
		this.titleText.visible = true;
	    this.blackBackground.visible = true;
	    this.sprite.visible = true;
	    this.blackBackground.events.onInputDown.add(function(){
            this.removeElements();
        }, this);
	}

	removeElements() {
		this.onClosed.dispatch();
		this.sprite.destroy();
		this.blackBackground.destroy();
		this.texts.forEach((text) => {
			text.destroy();
		});
	}
}













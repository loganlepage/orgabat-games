"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ModalSprite from "./ModalSprite";
import Phaser from 'phaser';
import Response from '../Response/Response';

export default class QuestionModal extends BasicGameObject {

	texts = [];
	onClosed = new Phaser.Signal();
	finish = new Phaser.Signal();

	constructor(game, title, responses) {

		super(game);

		this.x = this.game.world.centerX;
		this.y = this.game.world.centerY;
		this.responses = responses;

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
	    textPositionY = this.y - (this.sprite.height/2) + 125 * this.game.SCALE;
	    
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

	    // Responses
	    textPositionX = this.game.world.centerX - this.sprite.width / 2 + 50 * this.game.SCALE;
	    textPositionY = this.game.world.centerY - this.sprite.height / 2 + this.titleText.height + 150 * this.game.SCALE;

	    this.responsesGroup = [];
	    let correcAnswerCount = 0,
	    answerCount = 0;
	    responses.forEach((item) => {
	    	// Create response
	    	let response = new Response(this.game, textPositionX, textPositionY, item, this.sprite.width);
	    	this.responsesGroup.push(response);
	    	if (response.data.correct) {
	    		correcAnswerCount++;
	    	}
	    	// Check response when clicked event
	    	response.text.events.onInputDown.add(function(){
	    		if(response.validate()){
	    			answerCount++;
	    			if (answerCount >= correcAnswerCount) {
	    				this.finish.dispatch();
	    				this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
	    					this.removeElements();
	    				}, this);
	    			}
	    		}
	    	}, this);
	    	if (response.sprite != undefined) {
	    		response.sprite.events.onInputDown.add(function(){
		    		if(response.validate()){
		    			answerCount++;
		    			if (answerCount >= correcAnswerCount) {
		    				this.finish.dispatch();
		    				this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
		    					this.removeElements();
		    				}, this);
		    			}
		    		}
		    	}, this);
	    	}
	    	// Update position
	    	if (response.sprite != undefined) {
	    		textPositionY+= response.sprite.height + 40 * this.game.SCALE;
	    	} else {
	    		textPositionY+= response.text.height + 20 * this.game.SCALE;
	    	}
	    });
	    this.hide();
	}

	hide(){
		this.titleText.visible = false;
		this.responsesGroup.forEach((item) => {
			item.hide();
		});
		this.blackBackground.visible = false;
		this.sprite.visible = false;
	}

	show(){
		this.titleText.visible = true;
		this.responsesGroup.forEach((item) => {
			item.show();
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













"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import CheckBoxSprite from "./CheckBoxSprite";

export default class Element extends BasicGameObject {

	game;
    sprite;
    text;
    isSelected = false;

    constructor(game, x, y, error, element) {
        super(game);

        this.x = x;
        this.y = y;
        this.error = error;
        // If already selected
        if (element.answers.includes(error)) {
            this.isSelected = true;
        }

        // Add checbox image
        this.addSprite(new CheckBoxSprite(
        	game, 
        	x, 
        	y, 
        	this.isSelected ? "validate" : "list", 
        	this));
        // Click on checkbox image or [...]
        this.sprite.events.onInputDown.add(this.isSelected ? this.uncheckElement : this.checkElement, this);

        // Add mistake text
        this.text = this.game.add.text(
    		x + 40 * this.game.SCALE, 
    		y, 
    		error, 
    		{fill: '#000000', fontSize: 20 * this.game.SCALE}
    	);
        // [...] on checkbox text
    	this.text.inputEnabled = true;
        this.text.input.useHandCursor = true;
        this.text.events.onInputDown.addOnce(this.isSelected ? this.uncheckElement : this.checkElement, this);
    }

    checkElement(element) {
    	this.sprite.destroy();
            this.addSprite(new CheckBoxSprite(
                this.game, 
                this.x, 
                this.y, 
                "validate", 
                this));
        this.isSelected = true;
        this.sprite.events.onInputDown.add(this.isSelected ? this.uncheckElement : this.checkElement, this);
        element.events.onInputDown.addOnce(this.uncheckElement, this);
    }

    uncheckElement(element){
    	this.sprite.destroy();
        this.addSprite(new CheckBoxSprite(
        	this.game, 
        	this.x, 
        	this.y, 
        	"list", 
        	this));
        this.isSelected = false;
        this.sprite.events.onInputDown.add(this.isSelected ? this.uncheckElement : this.checkElement, this);
        element.events.onInputDown.addOnce(this.checkElement, this);
    }

    destroy(){
    	this.sprite.destroy();
    	this.text.destroy();
    }

}
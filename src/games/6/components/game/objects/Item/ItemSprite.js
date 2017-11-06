"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ItemSprite extends BasicGameSprite {
    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu6/${key}`, itemObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.6 * this.game.SCALE);
        this.addControls();
        this.originalPosition = this.position.clone();
        this.game.layer.zDepth1.addChild(this);
        this.events.onDragStart.add(function(sprite){
            this.game.layer.zDepth2.addChild(this);
        }, this);
        this.events.onDragStop.add(function(sprite){
            this.game.layer.zDepth1.addChild(this);
        }, this);
        // Afficher la position pour aider le placement:
        this.events.onDragStop.add(function(sprite){
            console.log("X: " + Math.round(sprite.position.x / this.game.SCALE));
            console.log("Y: " + Math.round(sprite.position.y / this.game.SCALE));
        },this);
    }

    init(){
        this.position.x = this.originalPosition.x;
        this.position.y = this.originalPosition.y;
        this.addControls();
        console.log("Init");
        this.game.layer.zDepth1.addChild(this);
    }

    addControls(){
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.input.enableDrag(true, true);
    }

    removeControls(){
        this.inputEnabled = false;
        this.input.useHandCursor = false;
        this.input.enableDrag(false, false);
    }

};

"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ItemSprite extends BasicGameSprite {
    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu4/${key}`, itemObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.6);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.input.enableDrag(false, true);
        this.originalPosition = this.position.clone();
        // Afficher la position pour aider le placement:
        // this.events.onDragStop.add(function(sprite){
        // 	console.log("X: " + Math.round(sprite.position.x / this.game.SCALE));
        // 	console.log("Y: " + Math.round(sprite.position.y / this.game.SCALE));
        // },this);
    }

    removeControls() {
        this.inputEnabled = false;
        this.input.useHandCursor = false;
        this.input.enableDrag(false, false);
    }

    addControls() {
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.input.enableDrag(false, true);
    }

};

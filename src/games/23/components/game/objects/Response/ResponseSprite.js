"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ResponseSprite extends BasicGameSprite {

    constructor(game, x, y, repo, link, buttonObj) {
        super(game, x, y, `jeu23/${repo}${link}`, buttonObj);
        this.link = link;
        this.anchor.setTo(0.5);
        this.scale.set(0.4 * this.game.SCALE);
        this.cloneOriginalPosition();
        // Afficher la position pour aider le placement:
        // this.events.onDragStop.add(function(sprite){
        //     console.log("X: " + Math.round(sprite.position.x / this.game.SCALE));
        //     console.log("Y: " + Math.round(sprite.position.y / this.game.SCALE));
        // },this);
    }

    cloneOriginalPosition() {
    	this.originalPosition = this.position.clone();
    }
};
"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

export default class CarriageSprite extends BasicGameSprite {

    spritesToMove = [];

    constructor({game, x, y, key = 'jeu6/chariot', shelfObj}) {
        super(game, x, y, key, shelfObj);
        this.anchor.setTo(0.5);
        this.scale.set(0.8 * this.game.SCALE);
        this.addControls();
        this.originalPosition = this.position.clone();
        this.previousX = this.originalPosition.x;
        this.previousY = this.originalPosition.y;
        this.events.onDragUpdate.add(this.dragUpdate, this);
        // Afficher la position pour aider le placement:
        // this.events.onDragStop.add(function(sprite){
        //     console.log("X: " + Math.round(sprite.position.x / this.game.SCALE));
        //     console.log("Y: " + Math.round(sprite.position.y / this.game.SCALE));
        // },this);
    }

    removeControls(){
        this.input.enableDrag(false, false);
        this.inputEnabled = false;
        this.input.useHandCursor = false;
    }

    addControls(){
        this.input.enableDrag(false, false);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
    }

    initElements(){
        this.spritesToMove = [];
        this.position.copyFrom(this.originalPosition);
        this.previousX = this.x;
        this.previousY = this.y;
    }

    addSpriteToMove(sprite) {
        sprite.removeControls();
        this.spritesToMove.push(sprite);
        // this.spritesToMove.unshift(sprite);
    }

    dragUpdate() {
        let diffX = this.x - this.previousX;
        let diffY = this.y - this.previousY;
        this.previousX = this.x;
        this.previousY = this.y;
        this.spritesToMove.forEach((element) => {
            element.position.x += diffX;
            element.position.y += diffY;
        }, this);
    }


};

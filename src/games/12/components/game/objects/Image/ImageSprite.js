"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class PlayerSprite extends BasicGameSprite {
    constructor(game, x, y, key, buttonObj) {
        super(game, x, y, `jeu12/images/${key}`, buttonObj);
        this.anchor.setTo(0.5);

        // To have cursor position on click and set shapes position
         this.inputEnabled = true;
         this.input.useHandCursor = true;
         this.events.onInputDown.add(function(){
             console.log((this.game.input.mousePointer.x - this.centerX) / game.SCALE);
             console.log((this.game.input.mousePointer.y - this.centerY) / game.SCALE);
         },this);
    }
};
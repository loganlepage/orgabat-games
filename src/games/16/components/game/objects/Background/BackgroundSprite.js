"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ProcedureSprite extends BasicGameSprite {

    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu16/${key}`, itemObj);
        this.anchor.setTo(0.5, 0.5);
        this.scale.set(0.8 * this.game.SCALE);
        
        // To have shapes position:
        this.inputEnabled = true;
        this.events.onInputDown.add(function(){
            console.log((x - Math.round(this.game.input.mousePointer.x)) / this.game.SCALE);
            console.log((y - Math.round(this.game.input.mousePointer.y)) / this.game.SCALE);
            // console.log((Math.round(this.game.input.mousePointer.x)) / this.game.SCALE);
            // console.log(Math.round((this.game.input.mousePointer.y)) / this.game.SCALE);
            // console.log(this.game.input.mousePointer.x);
            // console.log(this.game.input.mousePointer.y);
        }, this);
    }

};

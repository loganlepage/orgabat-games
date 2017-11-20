"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ProcedureSprite extends BasicGameSprite {

    constructor(game, x, y, key, itemObj) {
        super(game, x, y, `jeu8/${key}`, itemObj);
        this.anchor.setTo(0.5, 0.5);
        this.scale.set(1.2 * this.game.SCALE);
        this.inputEnabled = true;
        // this.events.onInputDown.add(function(){
        //     console.log((this.centerX - this.game.input.mousePointer.x) / this.game.SCALE);
        //     console.log((this.centerY - this.game.input.mousePointer.y) / this.game.SCALE);
        // }, this);
    }

};

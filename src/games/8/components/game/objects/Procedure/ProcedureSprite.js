"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";
import Phaser from 'phaser';

export default class ProcedureSprite extends BasicGameSprite {

    constructor(game, x, y, itemObj) {
        super(game, x, y, `jeu8/procedures`, itemObj);
        this.anchor.setTo(0.5, 0.5);
        this.scale.set(1);
    }

};

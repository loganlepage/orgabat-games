"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import CheckBoxSprite from "./CheckBoxSprite";

export default class Element extends BasicGameObject {

    key;

    constructor(game, x, y, key) {
        super(game);

        this.key = key;
        this.addSprite(new CheckBoxSprite(game, x, y, key, this));
        this.sprite.events.onInputDown.add(function(){
            this.addSprite(new CheckBoxSprite(game, x, y, "validate", this));
        }, this);
    }

}
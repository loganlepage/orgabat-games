"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import CheckBoxSprite from "./CheckBoxSprite";

export default class Element extends BasicGameObject {

    key;
    mistakes;
    quantity;
    dimensions;
    note;
    modal;
    sprites = [];

    constructor(game, x, y, key, element) {
        super(game);

        this.key = key;
        this.element = element;

        this.addSprite(new CheckBoxSprite(game, x, y, key, this));
    }

}
"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import CheckBox from "./CheckBox";

export default class Element extends BasicGameObject {

    key;
    mistakes;
    quantity;
    dimensions;
    note;
    modal;
    checkbox = [];

    constructor(game, x, y, key, name, mistakes, quantity, dimensions, note) {
        super(game);

        this.key = key;
        this.name = name;
        this.mistakes = mistakes;
        this.quantity = quantity;
        this.dimensions = dimensions;
        this.note = note;

        // Fonts size
        let bigFont = 24 * this.game.SCALE,
            mediumFont = 20 * this.game.SCALE;

        // Name of the element in the list
        this.game.add.text(x, y, name, {font: 'Arial', fontSize: mediumFont, fill: '#000000'});

        // Add 4 checkbox for answers
        x += 75;
        for (let i = 0; i < 4; i++) {
            x += 100;
            this.checkbox.push(new CheckBox(
                game,
                x,
                y,
                "list",
                this));
        }

    }

    preUpdate() {
        //
    }

    update() {
        //
    }

    postUpdate() {
        //
    }

    updateTransform() {
        //
    }

    _renderCanvas() {
        //
    }

}
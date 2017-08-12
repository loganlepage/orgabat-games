"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import Button from "../Button/Button";
import ListModal from "../Modal/ListModal";

export default class Element extends BasicGameObject {

    key;
    mistakes;
    note;
    errors;
    modal;

    constructor(game, x, y, key, name, mistakes, states) {
        super(game);

        this.key = key;
        this.name = name;
        this.mistakes = mistakes;
        this.states = states;

        // Fonts size
        let bigFont = 24 * this.game.SCALE,
            mediumFont = 20 * this.game.SCALE;

        // Name of the element in the list
        this.title = this.game.add.text(x, y, name, {font: 'Arial', fontSize: mediumFont, fill: '#000000'});
        this.game.layer.zDepth0.addChild(this.title);

        // Add modal element for answers
        this.button = new Button(game, x + 200, y, "select", this);
        this.button.sprite.anchor.setTo(0);
        this.button.sprite.scale.set(0.7);
        this.button.sprite.events.onInputDown.add(function(){
            this.button.sprite.inputEnabled = false;
            this.button.sprite.input.useHandCursor = false;
            this.modal = new ListModal(
                game, 
                game.world.centerX, 
                game.world.centerY, 
                "half_modal", 
                "Réception du produit",
                this,
                this.states);
        }, this);
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
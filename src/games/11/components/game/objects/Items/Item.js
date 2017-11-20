"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ItemSprite from "./ItemSprite";
import ItemModal from "../Modal/ItemModal";

export default class Item extends BasicGameObject {

    onClicked = new Phaser.Signal();
    onClosed = new Phaser.Signal();
    key;
    mistakes;
    quantity;
    dimensions;
    note;
    name;
    modal;

    constructor(game, x, y, key, mistakes, quantity, dimensions, note, name) {
        super(game);

        this.key = key;
        this.mistakes = mistakes;
        this.quantity = quantity;
        this.dimensions = dimensions;
        this.note = note;
        this.name = name;

        this.addSprite(new ItemSprite(game, x, y, key, this));

        if (this.quantity < 1) {
            this.sprite.visible = false;
        }

        this.sprite.events.onInputDown.add(function () {
            this.modal = new ItemModal(
                game, 
                game.world.centerX, 
                game.world.centerY, 
                "half_modal", 
                "Information sur le produit", 
                this);
            this.onClicked.dispatch();
            this.modal.sprite.events.onInputDown.add(function(){
                this.modal.removeElements();
                this.modal.sprite.destroy();
                this.onClosed.dispatch();
            }, this);
        }, this);

    }

    disableControls() {
        this.sprite.inputEnabled = false;
        this.sprite.input.useHandCursor = false;
    }

    enableControls() {
        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;
    }

    addTooltips(item){
        let text = this.game.add.text(
            item.input.sprite.position.x,
            item.input.sprite.position.y - (item.input.sprite.height / 2) - 0 * this.game.SCALE,
            item.obj.name,
            {
                font: 'Arial',
                // fontSize: 50 * this.game.SCALE,
                // fontSize: 50,
                fill: '#000000',
            }
        );
        text.anchor.setTo(0.5);
        return text;
    }
}
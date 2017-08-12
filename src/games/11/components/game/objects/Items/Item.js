"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ItemSprite from "./ItemSprite";
import ItemModal from "../Modal/ItemModal";

export default class Item extends BasicGameObject {

    key;
    mistakes;
    quantity;
    dimensions;
    note;
    modal;

    constructor(game, x, y, key, mistakes, quantity, dimensions, note) {
        super(game);

        this.key = key;
        this.mistakes = mistakes;
        this.quantity = quantity;
        this.dimensions = dimensions;
        this.note = note;

        this.addSprite(new ItemSprite(game, x, y, key, this));

        if (this.quantity < 1) {
            this.sprite.visible = false;
        }

        this.sprite.events.onInputDown.add(function () {
            this.modal = new ItemModal(game, game.world.centerX, game.world.centerY, "other/full_modal", "Information sur le produit", this);
            this.modal.sprite.events.onInputDown.add(function(){
                this.modal.removeElements();
                this.modal.sprite.destroy();
            }, this);
            // if (mistakes.includes("Produit défectueux")) {
            //     console.log("Produit défectueux");
            // } else if (mistakes.includes("Mauvaises quantités")) {
            //     console.log("Mauvaises quantités");
            // } else if (mistakes.includes("Non livré")) {
            //     console.log("Non livré");
            // } else if (mistakes.includes("Mauvaises dimensions")) {
            //     console.log("Mauvaises dimensions");
            // }else if (mistakes.includes("Erreur de produit")) {
            //     console.log("Erreur de produit");
            // }
        }, this);
    }

}
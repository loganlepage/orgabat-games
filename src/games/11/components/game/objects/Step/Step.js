"use strict";

import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";

import Phaser from 'phaser';
import {Signal} from 'phaser';

import Button from '../Button/Button';
import ItemFactory from "../Items/ItemFactory";

export default class Step extends BasicGameObject {

    finish = new Signal();

    game;

    title;
    items;
    button;

    constructor(game, itemsData) {
        super(game);
        this.itemsData = itemsData;
    }

    start() {

        // Title:
        this.title = this.game.add.text(20, 20, "Réceptionner la livraison", {font: 'Arial', fontSize: 20, fill: '#000000'});

        // Items:
        this.items = new ItemFactory(this.game, this.itemsData);
        this.items.forEach((item) => {
            //
        });

        // Button:
        this.button = new Button(this.game, this.game.world.width - 100, this.game.world.height - 50);
        this.button.sprite.events.onInputDown.add(function(){
            //
        }, this);
    }

    destroyItems() {
        //
    }

    finishStep() {
        this.destroyItems();
        this.finish.dispatch();
    }
}
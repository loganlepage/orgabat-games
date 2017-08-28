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
    continue;
    order;

    constructor(game, itemsData) {
        super(game);
        this.itemsData = itemsData;
    }

    start() {

        // Title:
        this.title = this.game.add.text(20, 20, "Réceptionner la livraison", {font: 'Arial', fontSize: 20, fill: '#000000'});

        // Items:
        this.items = new ItemFactory(this.game, this.itemsData);
    }

    destroyItems() {
        //
    }

    finishStep() {
        this.destroyItems();
        this.finish.dispatch();
    }
}
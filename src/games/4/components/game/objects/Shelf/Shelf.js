"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ShelfSprite from "./ShelfSprite";
import Phaser from 'phaser';

export default class Shelf extends BasicGameObject {
    ready = false;

    constructor({game, x, y, key}) {
        super(game);
        this.addSprite(new ShelfSprite({
            game: this.game,
            x: x,
            y: y,
            key: key,
            shelfObj: this
        }));
        this.ready = true;
    }

    destroy() {
        this.sprite.destroy();
    }
}
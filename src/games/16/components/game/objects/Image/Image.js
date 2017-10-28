"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ImageSprite from "./ImageSprite";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Image extends BasicGameObject {

    onDropped = new Signal();

    constructor(game, x, y, repo, key, correct) {
        super(game);
        this.x = x;
        this.y = y;
        this.repo = repo;
        this.key = key;
        this.correct = correct;
        this.addSprite(new ImageSprite(this.game, this.x, this.y, this.repo, this.key, this));
        this.addControls();
        this.validated = false;
    }

    validate(){
        if (this.correct) {
            this.validated = true;
            this.removeControls();
            return true;
        } else {
            PhaserManager.get('gabator').stats.changeValues({
                health: PhaserManager.get('gabator').stats.state.health - 1,
            });
            return false;
        }
    }

    addControls(){
        this.sprite.input.useHandCursor = true;
        this.sprite.inputEnabled = true;
    }

    removeControls(){
        this.sprite.input.useHandCursor = false;
        this.sprite.inputEnabled = false;
    }
}
"use strict";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ImageSprite from "./ImageSprite";
import Modal from "../Modal/Modal";

export default class Image extends BasicGameObject {

    constructor(game, x, y, key, correct, responses) {
        super(game);
        this.game = game;
        this.sprite = new ImageSprite(game, x, y, key, this);

        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;

        this.modal = new Modal(game, correct, responses);
        // this.modal.sprite.visible = false;
    }

}
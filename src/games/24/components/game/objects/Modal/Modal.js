"use strict";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import ModalSprite from "./ModalSprite";

export default class Image extends BasicGameObject {

    constructor(game, correct, responses) {
        super(game);
        this.game = game;
        this.sprite = new ImageSprite(game, this.game.world.centerX, this.game.world.centerY, this);

        this.texts = [];
        let x = this.sprite.centerX;
        let y = this.sprite.centerY - 100 * this.game.SCALE;
        responses.forEach((response) => {
            console.log(response);
            let text = this.game.add.text(
                x, 
                y, 
                response, 
                {
                    font: 'Arial', 
                    fontSize: 30 * this.game.SCALE, 
                    fill: '#000000',
                    align: 'center'
                }
            );
            this.texts.push(text);
            y += 30 * this.game.SCALE;
        });
    }

}
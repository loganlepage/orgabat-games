"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    onDropped = new Signal();

    constructor(game, x, y, title, correct) {
        super(game);
        this.x = x;
        this.y = y;
        this.title = title;
        this.correct = correct;
        this.text = this.game.add.text(this.x, this.y, this.title, {
            font: 'Arial', 
            fontSize: 25*this.game.SCALE, 
            fill: '#666666', 
            align: "center"});
        this.text.obj = this;
        this.text.anchor.setTo(0.5);
        this.addControls();
        // this.validated = false;
    }

    validate(){
        this.removeControls();
        if (this.correct) {
            // Text
            this.text.addColor("#4CA64C", 0);
            return true;
        } else {
            PhaserManager.get('gabator').stats.changeValues({
                health: PhaserManager.get('gabator').stats.state.health - 1,
            });
            // Text
            this.text.addColor("#CC0000", 0);
            return false;
        }
    }

    addControls(){
        this.text.inputEnabled = true;
        this.text.input.useHandCursor = true;
    }

    removeControls(){
        this.text.input.useHandCursor = false;
        this.text.inputEnabled = false;
    }
}
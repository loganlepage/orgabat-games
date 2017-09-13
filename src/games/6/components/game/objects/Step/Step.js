"use strict";
import StepSprite from "./StepSprite";
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Step extends BasicGameObject {

    constructor(game, good, title, x, y, clicked) {
        super(game);
        this.good = good;
        this.title = title;
        this.x = x;
        this.y = y;
        this.clicked = clicked;
        this.text1 = this.game.add.text(this.x, this.y, this.title, {fill: '#ffffff', fontSize: 25 * this.game.SCALE});
    }

    /*addText() {
        this.text = this.game.add.text(this.x, this.y, this.title, {fill: '#ffffff', fontSize: 25 * this.game.SCALE});
    }*/

    removeText() {
        this.text1.destroy();
        try {
            this.text2.destroy();
        } catch (e) {
            // console.log("Pas de texte 2 pour le texte: " + this.title);
        }
    }

    check() {
        if (this.good) {
            this.text2 = this.game.add.text(this.x, this.y, this.title, {fill: 'green', fontSize: 25 * this.game.SCALE});
            this.clicked = true;
            return true;
        } else {
            this.text2 = this.game.add.text(this.x, this.y, this.title, {fill: 'red', fontSize: 25 * this.game.SCALE});
            this.clicked = true;
            return false;
        }
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
"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import SituationSprite from "./SituationSprite";
import Phaser from 'phaser';
import {Signal} from "phaser";
import QuestionModal from "../Modal/QuestionModal";

export default class Situation extends BasicGameObject {

    validated;

    constructor(game, x, y, title, image, responses) {
        super(game);
        this.x = x;
        this.y = y;
        this.title = title;
        this.image = image;
        this.responses = responses;
        this.addSprite(new SituationSprite(this.game, this.x, this.y, this.image, this));
        this.validated = false;
        this.questionModal = new QuestionModal(this.game, this.title, this.responses);
        this.questionModal.visible = false;
        this.enableControls();
        this.questionModal.finish.add(this.validate, this);
    }

    disableControls(){
        this.sprite.input.useHandCursor = false;
        this.sprite.inputEnabled = false;
    }

    enableControls(){
        if (!this.validated) {
            this.sprite.inputEnabled = true;
            this.sprite.input.useHandCursor = true;
        }
    }

    validate(){
        this.rect = this.game.add.graphics(this.x, this.y);
        this.rect.lineStyle(5, 0x00CD00, 1);
        this.rect.drawRect(- this.sprite.width / 2, - this.sprite.height / 2, this.sprite.width, this.sprite.height);
        this.validated = true;
        this.disableControls();
        this.game.layer.zDepth0.addChild(this.rect);
    }

    displayQuestion(){
        this.questionModal.show();
    }
}
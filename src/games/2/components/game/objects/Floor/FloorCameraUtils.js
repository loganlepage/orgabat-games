"use strict";

import {Easing} from "phaser";
import Config from '../../config/data';

export default class FloorCameraUtils {

    game;
    floors;
    current;

    prevButton;
    nextButton;

    constructor(game, floors) {
        this.game = game;
        this.floors = floors;
        this.current = this.floors.children[0] ? 0 : -1;
        if (this.current == -1) console.error("there are no floors.");

        this.prevButton = this.game.add.sprite(0, 0, 'atlas', 'modal/item/arrow_up');
        this.prevButton.scale.set(this.game.uiScale(0.8));
        this.prevButton.anchor.setTo(0.5, 0.5);
        this.prevButton.fixedToCamera = true;
        this.prevButton.cameraOffset.setTo(this.game.uiScale(50), this.game.uiScale(50));
        this.prevButton.inputEnabled = true;
        this.game.layer.zDepth3.add(this.prevButton);
        this.prevButton.events.onInputDown.add(this.moveToPrev, this);

        this.nextButton = this.game.add.sprite(0, 0, 'atlas', 'modal/item/arrow_up');
        this.nextButton.scale.set(this.game.uiScale(0.8));
        this.nextButton.anchor.setTo(0.5, 0.5);
        this.nextButton.angle = 180;
        this.nextButton.fixedToCamera = true;
        this.nextButton.cameraOffset.setTo(this.game.uiScale(50), this.game.canvas.height - this.game.uiScale(127));
        this.nextButton.inputEnabled = true;
        this.game.layer.zDepth3.add(this.nextButton);
        this.nextButton.events.onInputDown.add(this.moveToNext, this);

        this.game.keys.addKey(Phaser.Keyboard.Z).onDown.add(this.moveToPrev, this);
        this.game.keys.addKey(Phaser.Keyboard.UP).onDown.add(this.moveToPrev, this);
        this.game.keys.addKey(Phaser.Keyboard.S).onDown.add(this.moveToNext, this);
        this.game.keys.addKey(Phaser.Keyboard.DOWN).onDown.add(this.moveToNext, this);
    }

    getOffsetTime(from, to) {
        return Math.abs(from - to);
    }

    buildButton(context, x, y) {
        context = this.game.add.sprite(0, 0, 'atlas', 'modal/item/button_a');
        context.scale.set(this.game.uiScale(0.8));
        context.fixedToCamera = true;
        context.cameraOffset.setTo(x, y);
        context.inputEnabled = true;
        this.game.layer.zDepth3.add(context);
        return context;
    }

    handlePrevButtonDisplay() {
        this.prevButton.visible = this.current < this.floors.children.length - 1;
    }

    handleNextButtonDisplay() {
        this.nextButton.visible = this.current > 0;
    }

    moveToPrev() {
        let floor;
        for (let i = this.current + 1; i <= this.floors.children.length - 1; ++i) {
            if (this.floors.children[i]) {
                floor = this.floors.children[i];
                if (floor.y > this.game.camera.y) {
                    continue;
                }
                this.setCurrent(i);
            }
            break;
        }
    }

    moveToNext() {
        let floor;
        for (let i = this.current - 1; i >= 0; --i) {
            if (this.floors.children[i]) {
                floor = this.floors.children[i];
                if (floor.y + floor.height < this.game.camera.y + this.game.canvas.height) {
                    continue;
                }
                this.setCurrent(i);
            }
            break;
        }
    }

    moveToLast() {
        return this.setCurrent(0);
    }

    setCurrent(i) {
        this.current = i;
        const to = this.floors.children[i].y - (this.game.canvas.height - this.floors.children[i].height);
        if (this.current >= 0 && this.current <= this.floors.children.length - 1) {
            this.handlePrevButtonDisplay();
            this.handleNextButtonDisplay();
            return this.game.add.tween(this.game.camera).to(
                {y: to + (100 * this.game.SCALE)},
                this.getOffsetTime(this.game.camera.y, to), Easing.Quadratic.InOut, false, 0
            ).start();
        } else {
            return null;
        }
    }
};
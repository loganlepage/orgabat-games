"use strict";

import {Easing} from "phaser";

export default class FloorCameraUtils {

    game;
    offsetTime;
    floors;
    current;

    prevButton;
    nextButton;

    constructor(game, floors) {
        this.game = game;
        this.floors = floors;
        //this.offsetTime = this.bootTweenTime = (this.game.world.height - this.game.camera.height) * 2;
        this.offsetTime = this.bootTweenTime = 500;
        this.current = this.floors.children[0] ? 0 : -1;
        if (this.current == -1) console.error("there are no floors.");

        this.prevButton = this.game.add.sprite(0, 0, 'atlas', 'modal/item/arrow_up');
        this.prevButton.scale.set(this.game.uiScale(0.8));
        this.prevButton.anchor.setTo(0.5, 0.5);
        this.prevButton.fixedToCamera = true;
        this.prevButton.cameraOffset.setTo(this.game.uiScale(50), this.game.uiScale(50));
        this.prevButton.inputEnabled = true;
        this.game.layer.zDepth3.add(this.prevButton);
        this.prevButton.events.onInputDown.add(() => {
            this.moveToPrev();
        }, this);

        this.nextButton = this.game.add.sprite(0, 0, 'atlas', 'modal/item/arrow_up');
        this.nextButton.scale.set(this.game.uiScale(0.8));
        this.nextButton.anchor.setTo(0.5, 0.5);
        this.nextButton.angle = 180;
        this.nextButton.fixedToCamera = true;
        this.nextButton.cameraOffset.setTo(this.game.uiScale(50), this.game.canvas.height - this.game.uiScale(150));
        this.nextButton.inputEnabled = true;
        this.game.layer.zDepth3.add(this.nextButton);
        this.nextButton.events.onInputDown.add(() => {
            this.moveToNext();
        }, this);
    }

    get minFloor() {
        return 0;
    }

    get maxFloor() {
        return this.floors.children.length - 1;
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
          this.prevButton.visible = this.current > this.minFloor;
    }

    handleNextButtonDisplay() {
          this.nextButton.visible = this.current < this.maxFloor;
    }

    moveToPrev() {
        let floor;
        console.log(this.current);
        for (let i = this.current - 1; i >= this.minFloor; --i) {
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
        console.log(this.current);
        for (let i = this.current + 1; i <= this.maxFloor; ++i) {
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
        return this.setCurrent(this.maxFloor);
    }

    setCurrent(i) {
        this.current = i;
        if (this.current >= this.minFloor && this.current <= this.maxFloor) {
            this.handlePrevButtonDisplay();
            this.handleNextButtonDisplay();
            return this.game.add.tween(this.game.camera).to({ //async, ok for break
                y: this.floors.children[i].y - (this.game.canvas.height - this.floors.children[i].height) / 2
            }, this.bootTweenTime, Easing.Quadratic.InOut, false, 0).start();
        } else {
            return null;
        }
    }
};
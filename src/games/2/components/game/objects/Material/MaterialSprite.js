"use strict";
import {Sprite, Signal} from "phaser";

/** Material Sprite (called by the material gameObject) */
export default class MaterialSprite extends Sprite {

    onDragStop = new Signal();

    /**
     * Constructor for a new material sprite
     * @param game
     * @param x
     * @param y
     * @param key
     * @param frame
     */
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        this.scale.set(this.game.SCALE);
        this.inputEnabled = true;
        this.input.enableDrag();
        this.game.layer.zDepth3.add(this);
        this.events.onDragStop.add(() => {
            this.onDragStop.dispatch(this)
        }, this);
    }
};
"use strict";
import {Sprite, Signal} from "phaser";
import Config from "../../config/data";

/** Material Sprite (called by the material gameObject) */
export default class MaterialSprite extends Sprite {

    static get CATCH_SIZE() {
        return 50;
    }

    onDragStop = new Signal();
    onDroppedHandled = new Signal();
    currentDepot = null;
    finished = false;

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
        this.inputEnabled = true;
        this.input.enableDrag();
        this.scale.set(this.game.SCALE * 0.5);
        this.game.layer.zDepth3.add(this);
        this.anchor.set(0.5);
        this.events.onDragStart.add(() => {
            this.parent.addChild(this); //bring to top
            if (this.currentDepot != null) {
                this.currentDepot.current = null;
            }
        }, this);
        this.events.onDragStop.add(() => {
            this.onDragStop.dispatch(this);
        }, this);
    }

    onDropped() {
        this.currentDepot = null;
        for (let i = 0; i < Config.depot.length; i++) {
            if (this.x / this.game.SCALE > (Config.depot[i].x - MaterialSprite.CATCH_SIZE) && this.x / this.game.SCALE < (Config.depot[i].x + MaterialSprite.CATCH_SIZE)
                && this.y / this.game.SCALE > Config.depot[i].y - MaterialSprite.CATCH_SIZE && this.y / this.game.SCALE < Config.depot[i].y + MaterialSprite.CATCH_SIZE) {
                if (Config.depot[i].current == null) {
                    this.x = Config.depot[i].x * this.game.SCALE;
                    this.y = Config.depot[i].y * this.game.SCALE;
                    this.currentDepot = Config.depot[i];
                    Config.depot[i].current = this;
                    this.onDroppedHandled.dispatch(this);
                }
                break;
            }
        }
    }

    finish() {
        this.events.onDragStart.removeAll();
        this.events.onDragStop.removeAll();
        this.finished = true;
        this.inputEnabled = false;
    }
};
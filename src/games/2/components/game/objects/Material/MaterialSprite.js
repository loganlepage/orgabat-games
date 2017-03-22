"use strict";
import {Sprite, Signal} from "phaser";
import Config from "../../config/data";

/** Material Sprite (called by the material gameObject) */
export default class MaterialSprite extends Sprite {

    static get CATCH_SIZE() { return 50; }
    onDragStop = new Signal();
    game;

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
        this.game = game;
        this.scale.set(this.game.SCALE * 0.5);
        this.inputEnabled = true;
        this.input.enableDrag();
        this.game.layer.zDepth3.add(this);
        this.events.onDragStop.add(() => {
            this.onDragStop.dispatch(this);
        }, this);
    }

    onDropped() {
        for(let i = 0; i < Config.depot.length; i++) {
            if(this.x / this.game.SCALE > (Config.depot[i].x - MaterialSprite.CATCH_SIZE) && this.x / this.game.SCALE  < (Config.depot[i].x + MaterialSprite.CATCH_SIZE)
                && this.y / this.game.SCALE  > Config.depot[i].y - MaterialSprite.CATCH_SIZE && this.y / this.game.SCALE  < Config.depot[i].y + MaterialSprite.CATCH_SIZE) {
                this.x = Config.depot[i].x * this.game.SCALE; this.y = Config.depot[i].y * this.game.SCALE;
            }
        }
    }
};
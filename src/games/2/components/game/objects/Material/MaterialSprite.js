"use strict";
import {Sprite, Signal} from "phaser";
import Config from "../../config/data";
import FloorSprite from "../Floor/FloorSprite";

/** Material Sprite (called by the material gameObject) */
export default class MaterialSprite extends Sprite {

    static get CATCH_SIZE() {
        return 50;
    }

    onDragStop = new Signal();
    onDroppedHandled = new Signal();
    currentDepot = null;
    finished = false;

    isDragged = false;

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
        this.input.priorityID = 100; //to drag over other sprites (bubbling)
        this.scale.set(this.game.SCALE);
        this.game.world.add(this);
        this.anchor.set(0.5);
        this.events.onInputDown.add(() => {
            window.a_sprite = this;
            //remove the sprite from the floor
            if(this.parent instanceof FloorSprite) {
                this.scale.set(this.game.SCALE);
                this.x = this.x * this.game.SCALE + this.parent.x;
                this.y = this.y * this.game.SCALE + this.parent.y;
            }
            this.game.world.addChild(this); //bring to top
            this.input.startDrag(this.game.input.activePointer);
            if (this.currentDepot != null) {
                this.currentDepot.current = null;
            }
        }, this);
        this.events.onDragStop.add(() => {
            this.onDragStop.dispatch(this);
        }, this);
    }

    /**
     * If we drop on a container
     */
    onDropped() {
        this.currentDepot = null;
        window.azeqsd = this;
        for (let i = 0; i < Config.depot.length; i++) {
            if (this.x / this.game.SCALE > (Config.depot[i].x - MaterialSprite.CATCH_SIZE) && this.x / this.game.SCALE < (Config.depot[i].x + MaterialSprite.CATCH_SIZE)
                && this.y / this.game.SCALE > Config.depot[i].y - MaterialSprite.CATCH_SIZE && this.y / this.game.SCALE < Config.depot[i].y + MaterialSprite.CATCH_SIZE) {
                if (Config.depot[i].current == null) {
                    this.currentDepot = Config.depot[i];
                    Config.depot[i].current = this;

                    //set the material to the floor
                    this.game.floorGroup.forEach((floor) => {
                        if(floor.obj.type == Config.depot[i].floor) {
                            this.scale.set(1);
                            this.x = Config.depot[i].x - floor.x / this.game.SCALE;
                            this.y = Config.depot[i].y - floor.y / this.game.SCALE;
                            floor.addChild(this);
                        }
                    });
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
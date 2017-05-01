"use strict";
import {Sprite, Signal, Math} from "phaser";
import Config from "../../config/data";
import FloorSprite from "../Floor/FloorSprite";

/** Material Sprite (called by the material gameObject) */
export default class MaterialSprite extends Sprite {

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
        this.input.priorityID = 100; //to drag over other sprites (bubbling)
        this.scale.set(this.game.SCALE);
        this.game.world.add(this);
        this.anchor.set(0.5);
        this._catchSize = 80 * this.game.SCALE;

        //Events
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
    drop() {
        this.currentDepot = null;

        //get all valid containers around the dropped material
        let containers = [];
        for (let i = 0; i < Config.depot.length; i++) {
            //if we drop on a container
            if (this.x / this.game.SCALE > (Config.depot[i].x - this._catchSize) && this.x / this.game.SCALE < (Config.depot[i].x + this._catchSize)
                && this.y / this.game.SCALE > Config.depot[i].y - this._catchSize && this.y / this.game.SCALE < Config.depot[i].y + this._catchSize) {

                //if the container is empty
                if (Config.depot[i].current == null) {
                    containers.push(Config.depot[i]);
                }
            }
        }

        //get the best result
        let container = null;
        for (let i = 0; i < containers.length; i++) {
            if (container === null) {
                container = containers[i];
            } else if (Math.distance(container.x, container.y, this.x, this.y) >
                Math.distance(containers[i].x, containers[i].y, this.x, this.y)) {
                container = containers[i];
            }
        }

        //set the material to the floor container*
        if(container !== null) {
            this.currentDepot = container;
            container.current = this;
            this.game.floorGroup.forEach((floor) => {
                if(floor.obj.type == container.floor) {
                    this.scale.set(1);
                    this.x = container.x - floor.x / this.game.SCALE;
                    this.y = container.y - floor.y / this.game.SCALE;
                    floor.addChild(this);
                }
            });
            this.onDroppedHandled.dispatch(this);
        }
    }

    finish() {
        this.events.onDragStart.removeAll();
        this.events.onDragStop.removeAll();
        this.finished = true;
        this.inputEnabled = false;
    }
};
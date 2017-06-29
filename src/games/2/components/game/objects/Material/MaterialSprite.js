"use strict";
import {Sprite, Signal, Math} from "phaser";
import Config from "../../config/data";
import FloorSprite from "../Floor/FloorSprite";
import Animation from "system/utils/Animation";

/** Material Sprite (called by the material gameObject) */
export default class MaterialSprite extends Sprite {

    onDragStop = new Signal();
    onDroppedHandled = new Signal();
    container = null;
    finished = false;

    /**
     * Constructor for a new material sprite
     * @param game
     * @param x
     * @param y
     * @param key
     * @param frame
     */
    constructor(game, x, y, key, frame, obj) {
        super(game, x, y, key, frame);
        this.obj = obj;
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
            if (this.parent instanceof FloorSprite) {
                this.scale.set(this.game.SCALE);
                this.x = this.x * this.game.SCALE + this.parent.x;
                this.y = this.y * this.game.SCALE + this.parent.y;
            }
            this.game.world.addChild(this); //bring to top
            this.input.startDrag(this.game.input.activePointer);
            if (this.container != null) {
                this.container.current = null;
            }
        }, this);

        this.events.onDragStop.add(() => {
            this.onDragStop.dispatch(this);
        }, this);
    }

    moveTo(to, cb) {
        Animation.moveToSprite({
            from: this, to, speedRatio: 6
        }, this.game).onComplete.addOnce(cb);
    }

    /**
     * Get the best container if we drop in many containers at the same time.
     * @returns {*}
     * @private
     */
    _getTheBestContainer() {

        //get all valid containers around the dropped material
        let containers = [];
        for (const container of Config.containers) {
            const area = container.area[this.obj.type];

            //if we drop on a container
            if (this.x / this.game.SCALE > container.area[this.obj.type].from.x - container.area[this.obj.type].from.radius * this.game.SCALE
                && this.x / this.game.SCALE < container.area[this.obj.type].from.x + container.area[this.obj.type].from.radius * this.game.SCALE
                && this.y / this.game.SCALE > container.area[this.obj.type].from.y - container.area[this.obj.type].from.radius * this.game.SCALE
                && this.y / this.game.SCALE < container.area[this.obj.type].from.y + container.area[this.obj.type].from.radius * this.game.SCALE) {

                //if the container is empty
                let allow = false;
                if (container.current !== this) {
                    allow = true;
                    if (container.current !== null
                        && (
                            container.protectsSwitchable.indexOf(container.current.obj.type) === -1
                            && container.protects.indexOf(container.current.obj.type) >= 0
                        )
                        && container.protects.indexOf(this.obj.type) === -1) {
                        allow = false;
                    }
                }
                if (allow) {
                    containers.push(container);
                }
            }
        }

        //get the best result
        let bestContainer = null;
        for (const container of containers) {
            if (bestContainer === null) {
                bestContainer = container;
            } else if (Math.distance(bestContainer.area[this.obj.type].to.x, bestContainer.area[this.obj.type].to.y, this.x, this.y) >
                Math.distance(container.area[this.obj.type].to.x, container.area[this.obj.type].to.y, this.x, this.y)) {
                bestContainer = container;
            }
        }

        return bestContainer;
    }

    /**
     * If we drop on a container
     */
    drop() {
        this.container = null;

        const container = this._getTheBestContainer();

        //set the material to the floor container
        if (container !== null) {

            this.container = container;

            if (container.current !== null && container.current !== this) {
                container.current.obj.kill(container.current);
            }

            container.current = this;
            this.game.floorGroup.forEach((floor) => {
                if (floor.obj.type == container.floor) {
                    this.scale.set(1);
                    this.x = container.area[this.obj.type].to.x - floor.x / this.game.SCALE;
                    this.y = container.area[this.obj.type].to.y - floor.y / this.game.SCALE;
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
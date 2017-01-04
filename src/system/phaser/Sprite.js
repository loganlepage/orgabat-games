'use strict';
import Phaser from 'phaser';
import EventHandler from '../utils/EventHandler';

/** Abstract gameObject (parent for all gameSprites) */
export default class Sprite extends Phaser.Sprite {
    constructor(game, x, y, name, gameObject) {
        super(game, x, y, name);
        this.objectCollisionEvent = new EventHandler();
        this.mouseOverEvent = new EventHandler();
        this.mouseOutEvent = new EventHandler();
        this.scale.set(game.SCALE);
        this.obj = gameObject;
        this.inputEnabled = true;
        this.events.onInputOver.add(this.mouseOver, this);
        this.events.onInputOut.add(this.mouseOut, this);
    }

    /** Events */
    objectCollision(obj1, obj2) {
        obj1.class = obj1.class === undefined ? 'gameObject' : obj1.class;
        obj2.class = obj2.class === undefined ? 'gameObject' : obj2.class;
        this.objectCollisionEvent.fire({me: obj1, object: obj2});
    }
    wallCollision(obj1, obj2) {
        obj2.class = 'layer';
        this.objectCollision(obj1, obj2);
    }
    mouseOver(sprite) {
        this.mouseOverEvent.fire(sprite);
    }
    mouseOut(sprite) {
        this.mouseOutEvent.fire(sprite);
    }
    update() {
        if(this.obj.update !== undefined)
            this.obj.update();
    }
};
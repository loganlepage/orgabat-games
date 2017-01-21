'use strict';
import Phaser from 'phaser';
import EventHandler from '../utils/EventHandler';

/** Abstract gameSprite (parent for all gameSprites) */
export default class GameSprite extends Phaser.Sprite {
    constructor(game, x, y, name, gameObject) {
        super(game, x, y, name);
        this.collisionEvent = new EventHandler();
        this.mouseOverEvent = new EventHandler();
        this.mouseOutEvent = new EventHandler();
        this.scale.set(game.SCALE);
        this.obj = gameObject;
        this.inputEnabled = true;
        this.events.onInputOver.add(this.mouseOver, this);
        this.events.onInputOut.add(this.mouseOut, this);
    }

    /** Events */
    onCollision(obj1, obj2) {
        obj1.class = obj1.class === undefined ? 'gameObject' : obj1.class;
        obj2.class = obj2.class === undefined ? 'gameObject' : obj2.class;
        this.collisionEvent.fire({me: obj1, object: obj2});
    }
    wallCollision(obj1, obj2) {
        obj2.class = 'layer';
        this.onCollision(obj1, obj2);
    }
    mouseOver(sprite) {
        if(!this.game.controlsEnabled) return;
        this.mouseOverEvent.fire(sprite);
    }
    mouseOut(sprite) {
        if(!this.game.controlsEnabled) return;
        this.mouseOutEvent.fire(sprite);
    }
    update() {
        if(!this.game.controlsEnabled) return;
        if(this.obj.update !== undefined)
            this.obj.update();
    }
};
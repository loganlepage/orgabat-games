'use strict';
var Game = Game || {};
Game.Abstract = Game.Abstract || {};

/**
 * abstract gameObject (parent for all gameSprites)
 */
Game.Abstract.AbstractGameSprite = class AbstractGameSprite extends Phaser.Sprite {
    constructor(game, x, y, name, gameObject) {
        super(game, x, y, name);
        this.objectCollisionEvent = new Game.Utils.EventHandler();
        this.mouseOverEvent = new Game.Utils.EventHandler();
        this.mouseOutEvent = new Game.Utils.EventHandler();
        this.scale.set(Game.SCALE);
        this.obj = gameObject;
        this.inputEnabled = true;
        this.events.onInputOver.add(this.mouseOver, this);
        this.events.onInputOut.add(this.mouseOut, this);
    }

    /**
     * Events
     */
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
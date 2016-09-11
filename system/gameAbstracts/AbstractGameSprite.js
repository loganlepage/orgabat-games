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
        this.scale.set(Game.SCALE);
        this.name = name;
        this.obj = gameObject;
    }

    /**
     * Events
     */
    objectCollision(obj1, obj2) {
        this.objectCollisionEvent.fire({me: obj1, object: obj2});
    }

    update() {
        if(this.obj.update !== undefined)
            this.obj.update();
    }
};
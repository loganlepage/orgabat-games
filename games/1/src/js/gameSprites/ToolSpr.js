"use strict";
var Game = Game || {};
Game.Sprite = Game.Sprite || {};

/**
 * tool sprite (called by the Tool gameObject)
 */
Game.Sprite.ToolSpr = class ToolSpr extends Game.Abstract.AbstractGameSprite {
    constructor(game, x, y, name, toolObj){
        super(game, x, y, name, toolObj);
        this.setPhysics();
    }

    /**
     * initialize physics
     */
    setPhysics() {
        this.game.physics.p2.enable(this, Game.Config.data.developer.debug);
        this.body.setCollisionGroup(Game.CollisionGroup.tool);
        this.body.collides(Game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(Game.CollisionGroup.player, this.objectCollision, this);
        this.body.static = true;
    }
};
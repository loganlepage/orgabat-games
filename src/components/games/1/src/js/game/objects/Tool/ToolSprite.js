"use strict";
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * Tool Sprite (called by the tool gameObject)
 */
Game.Object.ToolSprite = class ToolSprite extends MyPhaser.Sprite {

    /**
     * Constructor for a new tool sprite
     * @param game
     * @param x
     * @param y
     * @param name
     * @param toolObj
     */
    constructor(game, x, y, name, toolObj){
        super(game, x, y, name, toolObj);
        this.setPhysics();
    }

    /** Initialize physics */
    setPhysics() {
        this.game.physics.p2.enable(this, Game.Config.data.developer.debug);
        this.body.setCollisionGroup(Game.CollisionGroup.tool);
        this.body.collides(Game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(Game.CollisionGroup.player, this.objectCollision, this);
        this.body.static = true;
    }
};
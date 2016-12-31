"use strict";
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * Material Sprite (called by the material gameObject)
 * @type {MaterialSprite}
 */
Game.Object.MaterialSprite = class MaterialSprite extends MyPhaser.Sprite {

    /**
     * Constructor for a new material sprite
     * @param game
     * @param x
     * @param y
     * @param name
     * @param materialObj
     */
    constructor(game, x, y, name, materialObj) {
        super(game, x, y, name, materialObj);
        this.setPhysics();
    }

    /** Initialize physics */
    setPhysics() {
        this.game.physics.p2.enable(this, Game.Config.data.developer.debug);
        this.body.setCollisionGroup(Game.CollisionGroup.material);
        this.body.collides(Game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(Game.CollisionGroup.player, this.objectCollision, this);
        this.body.static = true;
    }
};
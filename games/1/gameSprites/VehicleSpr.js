"use strict";
var Game = Game || {};
Game.Sprite = Game.Sprite || {};

/**
 * Constructor for a new vehicle sprite (called by the vehicle gameObject)
 */
Game.Sprite.VehicleSpr = class VehicleSpr extends Game.Abstract.AbstractGameSprite {
    constructor(game, x, y, name, vehicleObj) {
        super(game, x, y, name, vehicleObj);
        this.setPhysics();
    }

    /**
     * initialize physics
     */
    setPhysics() {
        this.game.physics.p2.enable(this, Game.Config.data.developer.debug);
        this.body.fixedRotation = true;
        this.body.setCollisionGroup(Game.CollisionGroup.vehicle);
        this.body.collides(Game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(Game.CollisionGroup.player, this.objectCollision, this);
        this.body.collides(Game.CollisionGroup.tool, this.objectCollision, this);
        this.body.collides(Game.CollisionGroup.material, this.objectCollision, this);
        this.body.collides(Game.CollisionGroup.layer, this.wallCollision, this);
        this.body.static = true;
    }
};
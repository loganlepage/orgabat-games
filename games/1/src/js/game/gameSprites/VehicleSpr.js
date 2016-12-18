"use strict";
var Game = Game || {};
Game.Sprite = Game.Sprite || {};

/**
 * Vehicile Sprite (called by the vehicle gameObject)
 * @type {VehicleSpr}
 */
Game.Sprite.VehicleSpr = class VehicleSpr extends Game.Abstract.AbstractGameSprite {

    /**
     * Constructor for a new vehicle sprite
     * @param game
     * @param x
     * @param y
     * @param name
     * @param vehicleObj
     */
    constructor(game, x, y, name, vehicleObj) {
        super(game, x, y, name, vehicleObj);
        this.setPhysics();
    }

    /** Initialize physics */
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
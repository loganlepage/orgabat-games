"use strict";
import Config from '../../config/data';
import Sprite from 'system/phaser/Sprite';

/** Vehicle Sprite (called by the vehicle gameObject) */
export default class VehicleSprite extends Sprite {

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
        this.game.physics.p2.enable(this, Config.developer.debug);
        this.body.fixedRotation = true;
        this.body.setCollisionGroup(this.game.CollisionGroup.vehicle);
        this.body.collides(this.game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.player, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.tool, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.material, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.layer, this.wallCollision, this);
        this.body.static = true;
    }
};
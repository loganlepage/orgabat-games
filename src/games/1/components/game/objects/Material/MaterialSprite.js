"use strict";
import Config from '../../config/data';
import Sprite from 'system/phaser/Sprite';

/** Material Sprite (called by the material gameObject) */
export default class MaterialSprite extends Sprite {

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
        this.game.physics.p2.enable(this, Config.developer.debug);
        this.body.setCollisionGroup(this.game.CollisionGroup.material);
        this.body.collides(this.game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.player, this.objectCollision, this);
        this.body.static = true;
    }
};
"use strict";
import Config from '../../config/data';
import GameSprite from 'system/phaser/GameSprite';

/** Material Sprite (called by the material gameObject) */
export default class MaterialSprite extends GameSprite {

    /**
     * Constructor for a new material sprite
     * @param game
     * @param x
     * @param y
     * @param key
     * @param materialObj
     */
    constructor(game, x, y, name, materialObj) {
        super(game, x, y, `jeu1/${name}`, materialObj);
        this.setPhysics();
    }

    /** Initialize physics */
    setPhysics() {
        this.game.physics.p2.enable(this, Config.developer.debug);
        this.body.setCollisionGroup(this.game.CollisionGroup.material);
        this.body.collides(this.game.CollisionGroup.vehicle, this.onCollision, this);
        this.body.collides(this.game.CollisionGroup.player, this.onCollision, this);
        this.body.static = true;
    }
};
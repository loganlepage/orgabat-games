"use strict";
import Config from '../../config/data';
import Sprite from 'system/phaser/Sprite';

/** Tool Sprite (called by the tool gameObject) */
export default class ToolSprite extends Sprite {

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
        this.game.physics.p2.enable(this, Config.developer.debug);
        this.body.setCollisionGroup(this.game.CollisionGroup.tool);
        this.body.collides(this.game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.player, this.objectCollision, this);
        this.body.static = true;
    }
};
"use strict";
import Config from '../../config/data';
import GameSprite from 'system/phaser/GameSprite';

/** Tool Sprite (called by the tool gameObject) */
export default class ToolSprite extends GameSprite {

    /**
     * Constructor for a new tool sprite
     * @param game
     * @param x
     * @param y
     * @param key
     * @param toolObj
     */
    constructor(game, x, y, name, toolObj){
        super(game, x, y, `jeu1/${name}`, toolObj);
        this.setPhysics();
    }

    /** Initialize physics */
    setPhysics() {
        this.game.physics.p2.enable(this, Config.developer.debug);
        this.body.setCollisionGroup(this.game.CollisionGroup.tool);
        this.body.collides(this.game.CollisionGroup.vehicle, this.onCollision, this);
        this.body.collides(this.game.CollisionGroup.player, this.onCollision, this);
        this.body.static = true;
    }
};
"use strict";
import Config from '../../config/data';
import Sprite from 'system/phaser/Sprite';

/** Character Sprite (called by the character gameObject) */
export default class CharacterSprite extends Sprite {

    /**
     * Constructor for a new character sprite
     * @param game
     * @param x
     * @param y
     * @param characterObj
     */
    constructor(game, x, y, characterObj) {
        super(game, x, y, "player", characterObj);
        this.setPhysics();
        this.setAnimations();
    }

    /** initialize physics and animations */
    setPhysics() {
        this.game.physics.p2.enable(this, Config.developer.debug);
        this.body.fixedRotation = true;
        this.body.setCollisionGroup(this.game.CollisionGroup.player);
        this.body.addRectangle(this.body.width, this.body.height, 0, 0);
        this.body.collides(this.game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.tool, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.material, this.objectCollision, this);
        this.body.collides(this.game.CollisionGroup.layer);
    }
    setAnimations() {
        this.animations.add('down', [0, 1, 2, 3], 10, true);
        this.animations.add('left', [4, 5, 6, 7], 10, true);
        this.animations.add('up', [8, 9, 10, 11], 10, true);
        this.animations.add('right', [12, 13, 14, 15], 10, true);
        this.direction = "down"; this.statut = "idle";
    }

    /** Manage current animation */
    idle(direction) {
        this.direction = direction;
        this.animations.stop();
        this.animations.play(direction, 8, true);
        this.animations.stop();
    }
    walk(direction) {
        this.direction = direction;
        this.animations.stop();
        this.animations.play(direction, 8, true);
    }
};
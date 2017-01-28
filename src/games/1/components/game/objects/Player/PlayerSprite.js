"use strict";
import Config from '../../config/data';
import GameSprite from 'system/phaser/GameSprite';
import {Keyboard} from 'phaser';

/** Player Sprite (called by the character gameObject) */
export default class PlayerSprite extends GameSprite {

    /**
     * Constructor for a new character sprite
     * @param game
     * @param x
     * @param y
     * @param name
     * @param characterObj
     */
    constructor(game, x, y, name, characterObj) {
        super(game, x, y, name, characterObj);
        this.setPhysics();
        this.setAnimations();
        this.isWalking = false;
    }

    /** initialize physics and animations */
    setPhysics() {
        this.game.physics.p2.enable(this, Config.developer.debug);
        this.body.fixedRotation = true;
        this.body.setCollisionGroup(this.game.CollisionGroup.player);
        this.body.addRectangle(this.body.width, this.body.height, 0, 0);
        this.body.collides(this.game.CollisionGroup.vehicle, this.onCollision, this);
        this.body.collides(this.game.CollisionGroup.tool, this.onCollision, this);
        this.body.collides(this.game.CollisionGroup.material, this.onCollision, this);
        this.body.collides(this.game.CollisionGroup.layer);
    }
    setAnimations() {
        this.animations.add(Keyboard.DOWN, [0, 1, 2, 3], 10, true);
        this.animations.add(Keyboard.LEFT, [4, 5, 6, 7], 10, true);
        this.animations.add(Keyboard.UP, [8, 9, 10, 11], 10, true);
        this.animations.add(Keyboard.RIGHT, [12, 13, 14, 15], 10, true);
        this.direction = Keyboard.DOWN;
    }

    /** Manage current animation */
    idle(direction) {
        this.isWalking = false;
        this.direction = direction;
        this.animations.stop();
        this.animations.play(direction, 8, true);
        this.animations.stop();
    }
    walk(direction) {
        if(!this.isWalking || this.direction !== direction) {
            this.isWalking = true;
            this.direction = direction;
            this.animations.stop();
            this.animations.play(direction, 8, true);
        }
    }
};
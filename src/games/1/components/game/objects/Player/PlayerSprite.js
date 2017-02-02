"use strict";
import Phaser from 'phaser';
import Config from '../../config/data';
import GameSprite from 'system/phaser/GameSprite';
import {Keyboard} from 'phaser';

/** Player Sprite (called by the character gameObject) */
export default class PlayerSprite extends GameSprite {

    isWalking = false;

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
    }

    /** initialize physics and animations */
    setPhysics() {
        this.game.physics.p2.enable(this, Config.developer.debug);
        this.body.fixedRotation = true;
        this.body.setRectangle(this.width - this.width*0.33, this.height*0.5, 0, this.height*0.25);
        this.body.setCollisionGroup(this.game.CollisionGroup.player);
        this.body.collides(this.game.CollisionGroup.vehicle, this.onCollision, this);
        this.body.collides(this.game.CollisionGroup.tool, this.onCollision, this);
        this.body.collides(this.game.CollisionGroup.material, this.onCollision, this);
        this.body.collides(this.game.CollisionGroup.layer);
        this.body.damping = 0;
    }
    setAnimations() {
        this.animations.add(Keyboard.DOWN, ['sprite/player/0', 'sprite/player/1', 'sprite/player/2', 'sprite/player/3'], 10, true);
        this.animations.add(Keyboard.LEFT, ['sprite/player/4', 'sprite/player/5', 'sprite/player/6', 'sprite/player/7'], 10, true);
        this.animations.add(Keyboard.UP, ['sprite/player/8', 'sprite/player/9', 'sprite/player/10', 'sprite/player/11'], 10, true);
        this.animations.add(Keyboard.RIGHT, ['sprite/player/12', 'sprite/player/13', 'sprite/player/14', 'sprite/player/15'], 10, true);
        this.animations.add(`${Keyboard.DOWN}_topview`, ['sprite/player/16'], 10, true);
        this.animations.add(`${Keyboard.UP}_topview`, ['sprite/player/17'], 10, true);
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
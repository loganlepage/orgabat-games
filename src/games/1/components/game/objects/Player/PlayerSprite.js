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
     * @param key
     * @param characterObj
     */
    constructor(game, x, y, name, characterObj) {
        super(game, x, y, `jeu1/${name}`, characterObj);
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
        this.animations.add(Keyboard.DOWN, ['jeu1/player/0', 'jeu1/player/1', 'jeu1/player/2', 'jeu1/player/3'], 10, true);
        this.animations.add(Keyboard.LEFT, ['jeu1/player/4', 'jeu1/player/5', 'jeu1/player/6', 'jeu1/player/7'], 10, true);
        this.animations.add(Keyboard.UP, ['jeu1/player/8', 'jeu1/player/9', 'jeu1/player/10', 'jeu1/player/11'], 10, true);
        this.animations.add(Keyboard.RIGHT, ['jeu1/player/12', 'jeu1/player/13', 'jeu1/player/14', 'jeu1/player/15'], 10, true);
        this.animations.add(`${Keyboard.DOWN}_topview`, ['jeu1/player/16'], 10, true);
        this.animations.add(`${Keyboard.UP}_topview`, ['jeu1/player/17'], 10, true);
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
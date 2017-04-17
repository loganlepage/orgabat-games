'use strict';
import {Math, Signal} from 'phaser';
import Type from '../utils/Type';
import BasicGameObject from './BasicGameObject';

/** Abstract gameObject (parent for all gameObjects) */
export default class GameObject extends BasicGameObject {

    onCollisionEndHandled = new Signal();

    constructor(game, layer) {
        super(game);
        this.layer = layer;
    }

    /** @returns {boolean} */
    static get COLLIDED() { return true }
    /** @returns {boolean} */
    static get UNCOLLIDED() { return false }

    /** Initialize a sprite & modal */
    addSprite(sprite) {
        super.addSprite(sprite);
        this.objectInCollision = null;
        this.objectInitialDistance = null;
        this.collisionEventEnabled = true;
        this.sprite.onCollisionHandled.add(this.onCollisionBegin, this);
    }
    update() {
        this.refreshObjectInCollision();
    }

    /** @returns {number} */
    get MAX_COLLIDE_DISTANCE() { return 25 * this.game.SCALE; }
    /** @returns {number} */
    get objectCurrentDistance() { return Math.distance(
        this._oic.sprite.position.x, this._oic.sprite.position.y,
        this.sprite.position.x, this.sprite.position.y
    )}
    refreshObjectInCollision() {
        if(Type.isExist(this._oic) &&
            this.objectCurrentDistance > this.objectInitialDistance + this.MAX_COLLIDE_DISTANCE) {
            const oic = this._oic; this._oic = null;
            this.onCollisionEnd(oic);
        }
    }

    /** Object collision */
    get objectInCollision() {
        this.refreshObjectInCollision();
        return this._oic;
    }
    set objectInCollision(object) {
        if(Type.isExist(object) && object.sprite === undefined && object.class === 'gameObject') return;
        this._oic = object;
        if(Type.isExist(this._oic)) {
            this.objectInitialDistance = this.objectCurrentDistance;
        }
    }
    onCollisionBegin() {}
    onCollisionEnd(s){}

    isCollidWith(type, o = this.objectInCollision) {
        return Type.isExist(o) && o.sprite.obj.constructor === type;
    }
}
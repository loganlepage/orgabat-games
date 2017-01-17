'use strict';
import {Math} from 'phaser';
import EventHandler from '../utils/EventHandler';
import Type from '../utils/Type';

/** Abstract gameObject (parent for all gameObjects) */
export default class GameObject {
    constructor(game, layer) {
        this.game = game;
        this.layer = layer;
        this.type = this.constructor.name;
    }

    /** @returns {boolean} */
    static get COLLIDED() { return true }
    /** @returns {boolean} */
    static get UNCOLLIDED() { return false }

    /** Initialize a sprite & modal */
    addSprite(sprite) {
        this.sprite = sprite;
        this.game.add.existing(this.sprite);
        this.objectInCollision = null;
        this.objectInitialDistance = null;
        this.collisionEventEnabled = true;
        this.collisionEndEvent = new EventHandler();
        this.collisionEndEvent.add(this, "onCollisionEnd");
        this.sprite.collisionEvent.add(this, "onCollisionBegin");
        this.sprite.mouseOverEvent.add(this, "mouseOver");
        this.sprite.mouseOutEvent.add(this, "mouseOut");
    }
    addModal(modal) {
        this.modal = modal;
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
        if(Type.isExist(this._oic) && this.objectCurrentDistance > this.objectInitialDistance + this.MAX_COLLIDE_DISTANCE) {
            const object = this._oic; this._oic = null;
            this.onCollisionEnd(object);
        }
    }

    /** Object collision */
    get objectInCollision() {
        this.refreshObjectInCollision();
        return this._oic;
    }
    set objectInCollision(object) {
        this._oic = object;
        if(Type.isExist(this._oic)) {
            this.objectInitialDistance = this.objectCurrentDistance;
        }
    }
    onCollisionBegin(o) {
        if(o.sprite === undefined && o.class === 'gameObject') return;
        this.objectInCollision = o;
    }
    onCollisionEnd(s){}
    mouseOver(){}
    mouseOut(){}

    isCollidWith(type, o = this.objectInCollision) {
        return Type.isExist(o) && o.sprite.obj.constructor === type;
    }
}
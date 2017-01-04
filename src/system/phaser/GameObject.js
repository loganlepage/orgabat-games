'use strict';
import {Math} from 'phaser';
import Type from '../utils/Type';

/** Abstract gameObject (parent for all gameObjects) */
export default class GameObject {
    constructor(game, layer, type) {
        this.game = game;
        this.layer = layer;
        this.type = type;
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
        this.sprite.objectCollisionEvent.add(this, "objectCollision");
        this.sprite.mouseOverEvent.add(this, "mouseOver");
        this.sprite.mouseOutEvent.add(this, "mouseOut");
    }
    addModal(modal) {
        this.modal = modal;
    }

    /** Object collision */
    objectCollisionUpdate() {
        if(this.objectInCollision === null) return;
        let actualDistance = Math.distance(
            this.objectInCollision.position.x, this.objectInCollision.position.y,
            this.sprite.position.x, this.sprite.position.y);
        if(actualDistance > this.objectInitialDistance + 25 * this.game.SCALE &&
            this.collisionEventEnabled) {
            if(Type.isExist(this.objectInCollision.obj.modal))
                this.objectInCollision.obj.modal.infoBox({visible: false, isPlayerCollide: Object.UNCOLLIDED, fixed: true});
            this.objectInCollision = null;
        }
        return this.objectInCollision;
    }
    objectCollision(o) {
        if(o.sprite === undefined && o.class === 'gameObject') return;
        this.objectInCollision = o.sprite;
        this.objectInitialDistance = Math.distance(
            this.objectInCollision.position.x, this.objectInCollision.position.y,
            this.sprite.position.x, this.sprite.position.y);
    }
    mouseOver(){}
    mouseOut(){}

    isCollidWith(collider, type) {
        return Type.isExist(collider) && this.objectInCollision.obj.type === type
    }
}
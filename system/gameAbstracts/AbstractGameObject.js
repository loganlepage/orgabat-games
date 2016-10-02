'use strict';
var Game = Game || {};
Game.Abstract = Game.Abstract || {};

/**
 * abstract gameObject (parent for all gameObjects)
 */
Game.Abstract.AbstractGameObject = class AbstractGameObject {
    constructor(game, layer, type) {
        this.game = game;
        this.layer = layer;
        this.type = type;
    }

    /**
     * Initialize a sprite & modal
     */
    addSprite(sprite) {
        this.sprite = sprite;
        this.game.add.existing(this.sprite);
        this.objectInCollision = null;
        this.objectInitialDistance = null;
        this.collisionEventEnabled = true;
        this.sprite.objectCollisionEvent.add(this, "objectCollision");
    }
    addModal(modal) {
        this.modal = modal;
    }

    /**
     * Object collision
     */
    objectCollisionUpdate() {
        if(this.objectInCollision === null) return;
        let actualDistance = Phaser.Math.distance(
            this.objectInCollision.position.x, this.objectInCollision.position.y,
            this.sprite.position.x, this.sprite.position.y);
        if(actualDistance > this.objectInitialDistance + 25 * Game.SCALE &&
            this.collisionEventEnabled) {
            if(this.objectInCollision.obj.modal !== undefined && this.objectInCollision.obj.modal !== null)
                this.objectInCollision.obj.modal.hideInfobox("infoBox");
            this.objectInCollision = null;
        }
        return this.objectInCollision;
    }
    objectCollision(o) {
        if(o.sprite === undefined && o.class === 'gameObject') return;
        this.objectInCollision = o.sprite;
        this.objectInitialDistance = Phaser.Math.distance(
            this.objectInCollision.position.x, this.objectInCollision.position.y,
            this.sprite.position.x, this.sprite.position.y);
    }
};
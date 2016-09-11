"use strict";
var Game = Game || {};
Game.Sprite = Game.Sprite || {};

/**
 * material sprite (called by the material gameObject)
 */
Game.Sprite.MaterialSpr = class MaterialSpr extends Game.Abstract.AbstractGameSprite {
    constructor(game, x, y, name, materialObj) {
        super(game, x, y, name, materialObj);
        this.setPhysics();
    }

    setPhysics() {
        this.game.physics.p2.enable(this, Game.Config.data.developer.debug);
        this.body.setCollisionGroup(Game.CollisionGroup.material);
        this.body.collides(Game.CollisionGroup.vehicle, this.objectCollision, this);
        this.body.collides(Game.CollisionGroup.player, this.objectCollision, this);
        this.body.static = true;
    }
};
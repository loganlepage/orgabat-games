"use strict";
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * tool object (include sprite and modals)
 */
Game.Object.MaterialObj = class MaterialObj extends Game.Abstract.AbstractGameObject {
    constructor(game, layer, name, properties, x, y) {
        super(game, layer, "material");
        this.addSprite(new Game.Sprite.MaterialSpr(game, Game.Utils.Position.getPixelAt(x),
            Game.Utils.Position.getPixelAt(y), name, this));
        this.addModal(new Game.Modal.MaterialModal(properties, this, game));
        this.configure(properties);
        this.ready = true;
    }

    /**
     * Config & initialize
     */
    configure(properties) {
        this.properties = properties;
    }

    /**
     * Events
     */
    onVehicleStart(vehicle){
        this.modal.changeVehicleState(vehicle);
    }
    onVehicleStop(){
        this.modal.changeVehicleState(null);
    }

    /**
     * Ressource comportements
     */
    getRessource(amount) {
        if(this.properties.amount >= amount) {
            this.properties.amount -= amount;
            this.modal.updateAmount(this.properties.amount);
            return {'name': this.sprite.name, 'amount': amount};
        } return {'name': this.sprite.name, 'amount': 0};
    }

    /**
     * Add comportements to an Object collided
     */
    objectCollision(o) {
        super.objectCollision(o);
        switch(this.objectInCollision.obj.type) {
            case "character":
                this.modal.infoBox();
                break;
            default:
                break;
        }
    }
};
"use strict";
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * tool object (include sprite and modals)
 */
Game.Object.ToolObj = class ToolObj extends Game.Abstract.AbstractGameObject {
    constructor(game, layer, name, properties, x, y) {
        super(game, layer, "tool");
        this.toolIsFullEvent = new Game.Utils.EventHandler();
        this.addSprite(new Game.Sprite.ToolSpr(this.game, Game.Utils.Position.getPixelAt(x),
            Game.Utils.Position.getPixelAt(y), name, this));
        this.addModal(new Game.Modal.ToolModal(properties, this, game));
        this.configure(properties);
        this.ready = true;
    }

    /**
     * Config
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
    setRessource(amount, cb) {
        let cbZero = () => { cb(this.sprite.key, 0); };
        let cbAmount = () => { cb(this.sprite.key, amount); };
        if(this.properties.amountMax < this.properties.amount + amount) return cbZero();
        this.properties.amount += amount;
        this.modal.updateAmount(this.properties.amount);
        if(this.properties.amountMax === this.properties.amount) this.toolIsFullEvent.fire();
        return cbAmount();
    }

    /**
     * Add comportements to an Object collided
     */
    objectCollision(o) {
        super.objectCollision(o.object);
        switch(this.objectInCollision.obj.type) {
            case "character":
                this.modal.infoBox();
                break;
            default:
                break;
        }
    }
};



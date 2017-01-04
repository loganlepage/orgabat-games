"use strict";
import GameObject from 'system/phaser/GameObject';
import MaterialSprite from './MaterialSprite';
import MaterialModal from './MaterialModal';
import Position from 'system/phaser/utils/Position';

/** Material Object (include sprite and modals) */
export default class Material extends GameObject {

    /**
     * Constructor for a new material object
     * @param game
     * @param layer
     * @param name
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, layer, name, properties, x, y) {
        super(game, layer, "material");
        this.addSprite(new MaterialSprite(game, Position.getPixelAt(x), Position.getPixelAt(y), name, this));
        this.addModal(new MaterialModal(properties, this, game));
        this.configure(properties);
        this.ready = true;
    }

    /** Config & initialize */
    configure(properties) {
        this.properties = properties;
    }

    /** Events */
    onVehicleStart(vehicle){
        this.modal.changeVehicleState(vehicle);
    }
    onVehicleStop(){
        this.modal.changeVehicleState(null);
    }

    /** Ressource comportements */
    getRessource(amount, cb) {
        let cbZero = () => { cb(this.sprite.key, 0); };
        let cbAmount = () => { cb(this.sprite.key, amount); };
        if(this.properties.amount < amount) return cbZero();
        this.properties.amount -= amount;
        this.modal.updateAmount(this.properties.amount);
        return cbAmount();
    }

    /** Ressource comportements */
    setRessource(amount, cb) {
        this.properties.amount += amount;
        this.modal.updateAmount(this.properties.amount);
        return cb(this.sprite.key, amount);
    }

    /** Add events comportements */
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
    mouseOver() {
      //  if(!this.game.modals.infoboxAreHided() || this.modal.isShowing('infoBox', 'fixed')) return;
      //  this.modal.infoBox();
    }
    mouseOut() {
      //  this.modal.hideInfobox('infoBox');
    }
};
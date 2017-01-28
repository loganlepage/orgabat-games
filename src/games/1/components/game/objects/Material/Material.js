"use strict";
import GameObject from 'system/phaser/GameObject';
import MaterialSprite from './MaterialSprite';
import MaterialModal from './MaterialModal';
import GameModal from 'system/phaser/GameModal';
import Position from 'system/phaser/utils/Position';
import Type from 'system/utils/Type';

import Vehicle from '../Vehicle/Vehicle';
import Player from '../Player/Player';

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
        super(game, layer);
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
        if(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current)
            && this.properties.amount.current > 0) {
            this.modal.tooltipHandler(GameModal.VISIBLE, null, GameModal.FIXED);
            this.modal.tooltip.setButtons();
        }
    }
    onVehicleStop(){
        this.modal.tooltipHandler(GameModal.HIDDEN, null, GameModal.NOT_FIXED);
        this.modal.tooltip.delButtons();
    }

    /** Ressource comportements */
    getRessource(amount, cb) {
        let cbZero = () => { cb(this.sprite.key, 0); };
        let cbAmount = () => { cb(this.sprite.key, amount); };
        if(!(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current))) return;
        if(this.properties.amount.current < amount) return cbZero();
        this.properties.amount.current -= amount;
        this.modal.tooltip.setAmount(this.properties.amount.current);
        return cbAmount();
    }

    /** Ressource comportements */
    setRessource(amount, cb) {
        if(!(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current))) return;
        this.properties.amount.current += amount;
        this.modal.tooltip.setAmount(this.properties.amount.current);
        return cb(this.sprite.key, amount);
    }

    /** Add events comportements */
    onCollisionBegin(o) {
        super.onCollisionBegin(o.object);
        switch(this.objectInCollision.sprite.obj.constructor) {
            case Vehicle:
            case Player:
                this.modal.tooltipHandler(GameModal.VISIBLE, GameModal.CONTROLS_DISABLED, null, GameModal.FORCE);
                break;
            default:
                break;
        }
    }
    onCollisionEnd(o) {
        if(super.isCollidWith(Vehicle, o) || super.isCollidWith(Player, o))
            this.modal.tooltipHandler(GameModal.HIDDEN, GameModal.CONTROLS_ENABLED);
    }
    onMouseOver() {
        this.modal.tooltipHandler(GameModal.VISIBLE);
    }
    onMouseOut() {
        this.modal.tooltipHandler(GameModal.HIDDEN);
    }
};
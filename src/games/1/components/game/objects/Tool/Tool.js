"use strict";
import GameObject from 'system/phaser/GameObject';
import ToolSprite from './ToolSprite';
import ToolModal from './ToolModal';
import GameModal from 'system/phaser/GameModal';
import Position from 'system/phaser/utils/Position';
import EventHandler from 'system/utils/EventHandler';
import Type from 'system/utils/Type';

import Vehicle from '../Vehicle/Vehicle';
import Player from '../Player/Player';

/** Tool Object (include sprite and modals) */
export default class Tool extends GameObject {

    /**
     * Constructor for a new tool object
     * @param game
     * @param layer
     * @param name
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, layer, name, properties, x, y) {
        super(game, layer);
        this.isFullEvent = new EventHandler();
        this.addSprite(new ToolSprite(this.game, Position.getPixelAt(x), Position.getPixelAt(y), name, this));
        this.addModal(new ToolModal(properties, this, game));
        this.configure(properties);
        this.ready = true;
    }

    /** Config */
    configure(properties) {
        this.properties = properties;
    }
    
    /** Events */
    onVehicleStart(vehicle){
        if(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current)
            && Type.isNumber(this.properties.amount.max) && this.properties.amount.current < this.properties.amount.max)
            this.modal.tooltipHandler(GameModal.VISIBLE, null, GameModal.FIXED);
        if(Type.isExist(this.properties.needed))
            this.modal.tooltip.setButtons({a:false, e:true});
    }
    onVehicleStop(){
        this.modal.tooltipHandler(GameModal.HIDDEN, null, GameModal.NOT_FIXED);
        this.modal.tooltip.delButtons();
    }

    /** Ressource comportements */
    setRessource(amount, cb) {
        let cbZero = () => { cb(this.sprite.key, 0); };
        let cbAmount = () => { cb(this.sprite.key, amount); };
        if(!(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current)
            && Type.isNumber(this.properties.amount.max))) return;
        if(this.properties.amount.max < this.properties.amount.current + amount) return cbZero();
        this.properties.amount.current += amount;
        this.modal.tooltip.setAmount(this.properties.amount.current);
        if(this.properties.amount.max === this.properties.amount.current) this.isFullEvent.fire();
        return cbAmount();
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
    mouseOver() {
        this.modal.tooltipHandler(GameModal.VISIBLE);
    }
    mouseOut() {
        this.modal.tooltipHandler(GameModal.HIDDEN);
    }
};



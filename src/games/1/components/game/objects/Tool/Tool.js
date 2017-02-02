"use strict";
import {Signal} from 'phaser';
import GameObject from 'system/phaser/GameObject';
import ToolSprite from './ToolSprite';
import ToolModal from './ToolModal';
import GameModal from 'system/phaser/GameModal';
import Position from 'system/phaser/utils/Position';
import Type from 'system/utils/Type';

import Vehicle from '../Vehicle/Vehicle';
import Player from '../Player/Player';

/** Tool Object (include sprite and modals) */
export default class Tool extends GameObject {

    ready = false;

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
        this.onFull = new Signal();
        this.addSprite(new ToolSprite(this.game, Position.getPixelAt(x), Position.getPixelAt(y), name, this));
        this.addModal(new ToolModal(properties, this, game));
        this.configure(properties);
        this.onVehicleStartHandled = new Signal();
        this.onVehicleStopHandled = new Signal();
        this.onAmountChange = new Signal();
        this.type = name;
        this.ready = true;
    }

    /** Config */
    configure(properties) {
        this.properties = properties;
    }
    
    /** Events */
    onVehicleStart() {
        if(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current)
            && Type.isNumber(this.properties.amount.max) && this.properties.amount.current < this.properties.amount.max) {
            this.modal.showTooltip(GameModal.FIXED);
            this.onVehicleStartHandled.dispatch();
        }
       // Type.isExist(this.properties.needed) ? {a:false, e:true} : null
    }
    onVehicleStop(){
        this.onVehicleStopHandled.dispatch();
    }

    /** Ressource comportements */
    setRessource(amount, cb) {
        let cbZero = () => { cb(this.type, 0); };
        let cbAmount = () => { cb(this.type, amount); };
        if(!(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current)
            && Type.isNumber(this.properties.amount.max))) return;
        if(this.properties.amount.max < this.properties.amount.current + amount) return cbZero();
        this.properties.amount.current += amount;
        this.onAmountChange.dispatch(this.properties.amount.current);
        if(this.properties.amount.max === this.properties.amount.current)
            this.onFull.dispatch();
        return cbAmount();
    }

    /** Add events comportements */
    onCollisionBegin(o) {
        this.objectInCollision = o.object;
        if(Type.isInstanceOf(this.objectInCollision.sprite.obj, Vehicle)
        || Type.isInstanceOf(this.objectInCollision.sprite.obj, Player)) {
            this.modal.showTooltip()
        }
    }
    onCollisionEnd(o) {
        if(super.isCollidWith(Vehicle, o) || super.isCollidWith(Player, o))
            this.onCollisionEndHandled.dispatch();
    }
    onMouseOver() {
        this.modal.showTooltip()
    }
    onMouseOut() {
        this.onMouseOutHandled.dispatch();
    }
};



"use strict";
import {Signal} from 'phaser'
import GameObject from 'system/phaser/GameObject';
import MaterialSprite from './MaterialSprite';
import MaterialModalHandler from './MaterialModalHandler';
import GameModal from 'system/phaser/GameModal';
import Position from 'system/phaser/utils/Position';
import Type from 'system/utils/Type';

import Vehicle from '../Vehicle/Vehicle';
import Player from '../Player/Player';

/** Material Object (include sprite and modals) */
export default class Material extends GameObject {

    ready = false;

    /**
     * Constructor for a new material object
     * @param game
     * @param layer
     * @param name
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, layer, type, properties, x, y) {
        super(game, layer);
        this.addSprite(new MaterialSprite(game, Position.getPixelAt(x), Position.getPixelAt(y), type, this));
        this.addModalHandler(new MaterialModalHandler(properties, this, game));
        this.configure(properties);
        this.onVehicleStartHandled = new Signal();
        this.onVehicleStopHandled = new Signal();
        this.onAmountChange = new Signal();
        this.type = type;
        this.ready = true;
    }

    /** Config & initialize */
    configure(properties) {
        this.properties = properties;
    }

    /** Events */
    onVehicleStart(vehicle) {
        if (Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current)
            && this.properties.amount.current > 0) {
            this.modalHandler.showTooltip(GameModal.FIXED);
            this.onVehicleStartHandled.dispatch();
        }
    }

    onVehicleStop() {
        this.onVehicleStopHandled.dispatch();
    }

    /** Ressource comportements */
    getRessource(amount, cb) {
        let cbZero = () => {
            cb(this.type, 0);
        };
        let cbAmount = () => {
            cb(this.type, amount);
        };
        if (!(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current))) return;
        if (this.properties.amount.current < amount) return cbZero();
        this.properties.amount.current -= amount;
        this.onAmountChange.dispatch(this.properties.amount.current);
        return cbAmount();
    }

    /** Ressource comportements */
    setRessource(amount, cb) {
        if (!(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current))) return;
        this.properties.amount.current += amount;
        this.onAmountChange.dispatch(this.properties.amount.current);
        return cb(this.type, amount);
    }

    /** Add events comportements */
    onCollisionBegin(o) {
        this.objectInCollision = o.object;
        if (Type.isInstanceOf(this.objectInCollision.sprite.obj, Vehicle)
            || Type.isInstanceOf(this.objectInCollision.sprite.obj, Player)) {
            this.modalHandler.showTooltip();
        }
    }

    onCollisionEnd(o) {
        if (super.isCollidWith(Vehicle, o) || super.isCollidWith(Player, o))
            this.onCollisionEndHandled.dispatch();
    }

    onMouseOver() {
        this.modalHandler.showTooltip();
    }

    onMouseOut() {
        this.onMouseOutHandled.dispatch();
    }
};
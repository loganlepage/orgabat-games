"use strict";
import VehicleSprite from '../VehicleSprite';

/** Vehicle Sprite (called by the vehicle gameObject) */
export default class ElevatorSprite extends VehicleSprite {

    /**
     * Constructor for a new elevator sprite
     * @param game
     * @param x
     * @param y
     * @param name
     * @param vehicleObj
     */
    constructor(game, x, y, name, vehicleObj) {
        super(game, x, y, name, vehicleObj);
        this.setPhysics();
    }
    setContext(obj) {
        this.obj = obj;
    }

    /** Initialize physics */
    setPhysics() {
        super.setPhysics();
        this.body.setRectangle(this.width*1.1, this.height);
    }
};
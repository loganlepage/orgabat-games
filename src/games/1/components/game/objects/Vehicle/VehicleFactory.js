'use strict';
import {Group} from 'phaser';
import Vehicle from './Vehicle';

/** Vehicle Group Factory (called by play state) */
export default class VehicleFactory extends Group {

    /**
     * Constructor for a new vehicle group
     * @param game
     * @param layer
     * @param vehicles
     */
    constructor(game, layer, vehicles) {
        super(game);
        for(let i in vehicles) {
            let vehicle = new Vehicle(
                this.game, layer, vehicles[i].name,
                vehicles[i].prop, vehicles[i].x, vehicles[i].y
            );
            this.add(vehicle.sprite);
        }
    }
};
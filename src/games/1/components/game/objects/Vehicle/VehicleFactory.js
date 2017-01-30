'use strict';
import GameFactory from 'system/phaser/GameFactory';
import Vehicle from './Vehicle';
import Type from 'system/utils/Type';

/** Vehicle Group Factory (called by play state) */
export default class VehicleFactory extends GameFactory {

    /**
     * Constructor for a new vehicle group
     * @param game
     * @param layer
     * @param vehicles
     */
    constructor(game, layer, vehicles) {
        super(game);
        for(let i in vehicles) {
            if(Type.isExist(vehicles[i].useClass) && !vehicles[i].useClass.prototype instanceof Vehicle)
                throw `${vehicles[i].useClass.prototype} doit étendre de ${Vehicle.prototype}`;

            this.add((new (Type.isExist(vehicles[i].useClass) ? vehicles[i].useClass : Vehicle)(
                this.game, layer, vehicles[i].name,
                vehicles[i].prop, vehicles[i].x, vehicles[i].y
            )).sprite);
        }
    }
};
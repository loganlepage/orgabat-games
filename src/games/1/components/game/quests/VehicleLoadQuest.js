import {Quest} from 'system/phaser/utils/Quest';

export default class VehicleLoadQuest extends Quest {
    constructor(game) {
        super(game);
        this._name = 'Prendre du mortier';
        this._key = 'vehicle_load';
        game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onLoaded.addOnce((name) => {if(name == 'mortier') this.done()}, this);
        });
    }
}

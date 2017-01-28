import {Quest} from 'system/phaser/utils/Quest';

export default class VehicleMountQuest extends Quest {
    constructor(game) {
        super(game);
        this._name = 'Utiliser un véhicule';
        this._key = 'vehicle_mount';
        game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onStarted.addOnce(this.done, this);
        });
    }
}

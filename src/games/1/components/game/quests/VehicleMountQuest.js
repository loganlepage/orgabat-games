import {Quest} from 'system/phaser/utils/Quest';

export default class VehicleMountQuest extends Quest {

    _name = 'Utiliser un véhicule';
    _key = 'vehicle_mount';

    constructor(game) {
        super(game);
        game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onStarted.addOnce(this.done, this);
        });
    }
}

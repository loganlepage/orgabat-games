import {Quest} from 'system/phaser/utils/Quest';

export default class VehicleMountQuest extends Quest {

    _name = 'Utiliser un véhicule';
    _key = 'vehicle_mount';
    _help = "Approchez-vous d'un véhicule jusqu'à faire apparaître sa boite d'information, puis appuyez sur A pour l'utiliser.";

    constructor(game) {
        super(game);
        game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onStarted.addOnce(this.done, this);
        });
    }
}

import {Quest} from 'system/phaser/utils/Quest';

export default class VehicleLoadQuest extends Quest {

    _name = 'Prendre du mortier';
    _key = 'vehicle_load';
    _help = 'Déplacez votre véhicule vers le mortier, \npuis appuyez sur A pour le charger.';

    constructor(game) {
        super(game);
        game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onLoaded.addOnce((name) => {if(name == 'mortier') this.done()}, this);
        });
    }
}

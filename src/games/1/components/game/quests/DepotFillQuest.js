import {Quest} from 'system/phaser/utils/Quest';

export default class DepotFillQuest extends Quest {

    _name = 'Déposer 9 charges de mortier dans le dépot';
    _key = 'depot_fill';
    _help = "Depuis votre véhicule, \napprochez-vous du dépot dans l'entrepôt, \npuis appuyez sur E pour décharger.";

    constructor(game) {
        super(game);
        game.toolGroup.forEach((tool) => {
            if(tool.key === 'depot')
                tool.obj.onFull.addOnce(this.done, this);
        });
    }
}

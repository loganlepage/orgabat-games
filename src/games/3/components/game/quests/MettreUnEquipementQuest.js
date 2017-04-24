import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class OuvrirBoiteEpiQuest extends Quest {

    _name = 'Mettre un équipement';
    _key = 'epi_setted';
    _help = "Équipez une pièce d'équipement en cliquant dessus depuis la boite à EPI.";

    constructor(game) {
        super(game);
        game.inventary.onStuffAdd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.epiOpen = this;
        }
    }
}

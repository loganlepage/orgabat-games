import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class OuvrirBoiteEpiQuest extends Quest {

    _name = 'Enlever un équipement';
    _key = 'epi_dropped';
    _help = "Enlevez une pièce d'équipement en cliquant dessus depuis la boite à EPI.";

    constructor(game) {
        super(game);
        game.inventary.onStuffDel.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.epiOpen = this;
        }
    }
}

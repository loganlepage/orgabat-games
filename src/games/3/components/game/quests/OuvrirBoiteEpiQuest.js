import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class OuvrirBoiteEpiQuest extends Quest {

    _name = 'Ouvrir la boite à EPI';
    _key = 'epi_open';
    _help = "Cliquez sur la boite à EPI en haut à gauche de votre écran.";

    constructor(game) {
        super(game);
        game.inventary.onOpen.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.epiOpen = this;
        }
    }
}

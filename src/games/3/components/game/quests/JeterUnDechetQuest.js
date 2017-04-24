import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class OuvrirBoiteEpiQuest extends Quest {

    _name = 'Jeter un déchet';
    _key = 'waste_dropped';
    _help = "Après s'être équipé, cliquez sur un déchet pour choisir une action.";

    constructor(game) {
        super(game);
        game.custom_events.dropAWaste.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.epiOpen = this;
        }
    }
}

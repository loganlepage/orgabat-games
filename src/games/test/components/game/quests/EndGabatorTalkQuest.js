import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class OuvrirBoiteEpiQuest extends Quest {

    _name = 'Terminer la discussion';
    _key = 'modal_end';
    _help = "Terminer la discussion avec Gabator.";

    constructor(game) {
        super(game);
        game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
